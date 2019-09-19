import * as React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IUserInfoInterface } from '../interfaces/IUserInfoInterface';

// Services
import { UrlService } from '../Services/UrlService';

interface IUpdateNameFormProps {
    userInfo: IUserInfoInterface;
}

interface IUpdateNameFormState {
    username: string;
    formStatus: 'invalid' | 'undefined' | 'valid';
    errorMessage: string;
    isNotDuplicateUsername: boolean;
    HasCorrectLength: boolean;
    successNameChange: 'failed' | 'undefined' | 'success';
}

export default class UpdateNameForm extends React.Component<IUpdateNameFormProps, IUpdateNameFormState> {
    private readonly urlService;

    public constructor (props: IUpdateNameFormProps) {
      super(props);

      this.urlService = new UrlService();

      this.state = {
        username: this.props.userInfo.username,
        formStatus: 'undefined',
        errorMessage: '',
        isNotDuplicateUsername: false,
        HasCorrectLength: true,
        successNameChange: 'undefined'
      };
    }

    public render () {
      return (
            <>
                <form method="POST">
                  <label form="usernameInput">Username</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={this.getInputClassName()}
                      defaultValue={this.props.userInfo.username}
                      id="usernameInput"
                      aria-describedby="usernameInput"
                      placeholder="Enter Username"
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
      if (this.state.successNameChange === 'success') {
        return (
          <div className="valid-feedback" style={{ display: 'block' }}>
                    Succesfully updated username!
          </div>
        );
      } else if (this.state.successNameChange === 'failed') {
        return (
          <div className="invalid-feedback" style={{ display: 'block' }}>
                    Something went wrong!
          </div>
        );
      }
    }

    private handleInputChange () {
      const inputValue = (document.getElementById('usernameInput') as HTMLInputElement).value;

      // Prevent Axios empty url requests
      if (inputValue.length === 0) {
        this.setState({ formStatus: 'invalid' });
        return;
      }

      // Username Length Validation
      if (inputValue.length <= 0 || inputValue.length >= 256) {
        this.setState({
          HasCorrectLength: false,
          errorMessage: 'Username must be at least 1 and maximal 255 characters long'
        }, () => this.validateForm());
      } else {
        this.setState({ HasCorrectLength: true }, () => this.validateForm());
      }

      // Username Duplicate Validation
      axios({
        method: 'post',
        url: `${this.urlService.getBaseURL()}/check/username/${inputValue}`
      })
        .then(response => {
          this.setState({
            isNotDuplicateUsername: response.data === 'valid',
            errorMessage: response.data === 'valid' ? '' : 'Username already taken!'
          }, () => this.validateForm());
        }, error => {
          console.log(error);
        });

      // Add Username to state
      this.setState({ username: inputValue });
    }

    private validateForm () {
      const formStatus =
        this.state.HasCorrectLength &&
        this.state.isNotDuplicateUsername;

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
          url: `${this.urlService.getBaseURL()}/update/username/${this.state.username}`
        })
          .then(response => {
            if (response.data === 'valid') {
              this.setState({ successNameChange: 'success' });
            } else if (response.data === 'invalid') {
              this.setState({ successNameChange: 'failed' });
            }
          }, error => {
            console.log(error);
          });
      }
    }
}
