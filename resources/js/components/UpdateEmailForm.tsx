import * as React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

// Services
import { UrlService } from '../Services/UrlService';

interface IUpdateEmailFormProps {
    userInfo: IUserInfoInterface;
}

interface IUpdateEmailFormState {
    email: string;
    formStatus: 'invalid' | 'undefined' | 'valid';
    errorMessage: string;
    isNotDuplicateEmail: boolean;
    HasCorrectLength: boolean;
    successEmailChange: 'failed' | 'undefined' | 'success';
}

export default class UpdateEmailForm extends React.Component<IUpdateEmailFormProps, IUpdateEmailFormState> {
    private readonly urlService;

    public constructor (props: IUpdateEmailFormProps) {
      super(props);

      this.urlService = new UrlService();

      this.state = {
        email: this.props.userInfo.email,
        formStatus: 'undefined',
        errorMessage: '',
        isNotDuplicateEmail: false,
        HasCorrectLength: true,
        successEmailChange: 'undefined'
      };
    }

    public render () {
      return (
            <>

                <form method="POST">
                  <label form="emailInput">E-Mail</label>
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className={this.getInputClassName()}
                      defaultValue={this.props.userInfo.email}
                      id="emailInput"
                      aria-describedby="emailInput"
                      placeholder="Enter E-Mail"
                      onChange={() => this.handleInputChange()}
                    />
                    <div className="input-group-append">
                      <button onClick={() => this.handleFormSubmit(event)} type="submit" className="input-group-text">
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                    </div>
                    <div className="invalid-feedback" style={this.state.formStatus === 'invalid' ? { display: 'block' } : { display: 'none' }}>
                      {this.state.errorMessage}
                    </div>
                    {this.renderUploadStatusAlert()}
                  </div>
                </form>
            </>
      );
    }

    private getInputClassName () {
      const bootstrapClass = 'form-control ';
      let statusClass = '';

      if (this.state.formStatus === 'valid') {
        statusClass = 'is-valid';
      } else if (this.state.formStatus === 'invalid') {
        statusClass = 'is-invalid';
      }

      return bootstrapClass + statusClass;
    }

    private renderUploadStatusAlert () {
      if (this.state.successEmailChange === 'success') {
        return (
          <div className="valid-feedback" style={{ display: 'block' }}>
                    Succesfully updated email!
          </div>
        );
      } else if (this.state.successEmailChange === 'failed') {
        return (
          <div className="invalid-feedback" style={{ display: 'block' }}>
                    Something went wrong!
          </div>
        );
      }
    }

    private handleInputChange () {
      const inputValue = (document.getElementById('emailInput') as HTMLInputElement).value;

      // Prevent Axios empty url requests
      if (inputValue.length === 0) {
        this.setState({ formStatus: 'invalid' });
        return;
      }

      // Email Length Validation
      if (inputValue.length <= 4 || inputValue.length >= 256) {
        this.setState({
          HasCorrectLength: false,
          errorMessage: 'Email must be at least 4 and maximal 255 characters long'
        }, () => this.validateForm());
      } else {
        this.setState({ HasCorrectLength: true }, () => this.validateForm());
      }

      // Email Duplicate Validation
      axios({
        method: 'post',
        url: `${this.urlService.getBaseURL()}/check/email/${inputValue}`
      })
        .then(response => {
          console.log(response.data);
          this.setState({
            isNotDuplicateEmail: response.data === 'valid',
            errorMessage: response.data === 'valid' ? '' : 'Email already taken!'
          }, () => this.validateForm());
        }, error => {
          console.log(error);
        });

      // Add Email to state
      this.setState({ email: inputValue });
    }

    private validateForm () {
      const formStatus =
        this.state.HasCorrectLength &&
        this.state.isNotDuplicateEmail;

      if (formStatus) {
        this.setState({ formStatus: 'valid' });
      } else {
        this.setState({ formStatus: 'invalid' });
      }
    }

    private handleFormSubmit (event) {
      event.preventDefault();
      if (this.state.formStatus === 'valid') {
        axios({
          method: 'post',
          url: `${this.urlService.getBaseURL()}/update/email/${this.state.email}`
        })
          .then(response => {
            console.log(response.data);
            if (response.data === 'valid') {
              this.setState({ successEmailChange: 'success' });
            } else if (response.data === 'invalid') {
              this.setState({ successEmailChange: 'failed' });
            }
          }, error => {
            console.log(error);
          });
      }
    }
}
