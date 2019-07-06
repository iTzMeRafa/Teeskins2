# Teeskins - Teeworlds Assets Database

## Technology
This Project uses the PHP-framework [Laravel](https://laravel.com/) serving as the backend.  
[React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/) and CSS for the frontend.
[Webpack](https://webpack.js.org/) to bundle all files.

## Usage & Installation

[Composer](https://getcomposer.org/), [NodeJS](https://nodejs.org/en/) and [>=PHP5.0](https://secure.php.net/) is required to run this project.

* Clone this repository to your desired location and update+install dependencies:

* Rename the __.env.example__ file to __.env__ and enter your values


```php
composer install
npm install
php artisan cache:clear
php artisan key:generate
composer dumpautoload
```
* Compile all react files
- compiling once: ``` npm run dev ```
- compiling and watching changes: ``` npm run watch ```
* Update your apache2 vHost config file (if needed):

* Optional if you keep getting errors, try:
```config
<Directory "/var/www/example.net/public">
    Options Indexes FollowSymLinks Includes ExecCGI
    AllowOverride All
    Require all granted
</Directory>
```

* Grant Permission ```777 ``` to the ```storage/``` folder.   
* Add user group ```www-data ``` to ```/public/img ``` folder:   
```sudo chown -R www-data:www-data /public/img ```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
