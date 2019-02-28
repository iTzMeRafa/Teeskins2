# Teeskins - Teeworlds Skins Database

Teeskins is a comprehensive database for teeworlds skins.

## Usage & Installation

[Composer](https://getcomposer.org/) and [>=PHP5.0](https://secure.php.net/) is required to run this project.  
For the frontend part I use [React](https://reactjs.org/), [npm](https://www.npmjs.com/) and [scss](https://sass-lang.com/).  
I run [Webpack](https://webpack.js.org/) to bundle and compile the webapplication.  

* Clone this repository to your desire location:

```git
git clone https://github.com/iTzMeRafa/Teeskins.git
```

* Remove ```package-lock.json``` & ```composer-lock.json```

* Install required node packages.

```config
npm install
```

* Update and Install Composer Packages
```php
composer update
composer install
php artisan cache:clear
composer dumpautoload
```

* Rename the __.env.example__ file to __.env__ and enter your values

* Update your apache2 vHost config file (if neccessary):

```config
<Directory "/var/www/Teeskins/public">
    Options Indexes FollowSymLinks Includes ExecCGI
    AllowOverride All
    Require all granted
</Directory>
```

* Grant Permission ```777 ``` to the ```storage/``` folder.   
* Add user group ```www-data ``` to ```/public/img ``` folder:   
```sudo chown -R www-data:www-data /public/img ```

## Errors / FAQ / HELP
Error: Your requirements could not be resolved to an installable set of packages.  
Fix: ```sudo apt-get install php-xml```
```sudo apt-get install php7.0-gmp ```
```sudo apt-get install php-curl```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)