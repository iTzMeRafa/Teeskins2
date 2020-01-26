# Teeskins - Teeworlds Assets Database
![Teeskins Page Overview](public/img/teeskins-preview.png)

## Technology
This Project uses the PHP-framework [Laravel](https://laravel.com/) serving as the backend.  
[React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/) and [SCSS](https://sass-lang.com/) for the frontend.
[Webpack](https://webpack.js.org/) to bundle all files.

## Usage & Installation

[Composer](https://getcomposer.org/), [NodeJS](https://nodejs.org/en/) and [>=PHP5](https://secure.php.net/) is required to run this project.

* Clone this repository to your desired location and install dependencies:

* Rename the __.env.example__ file to __.env__ and enter your values


```php
composer install
npm install
php artisan cache:clear
php artisan key:generate
composer dumpautoload
```
## Compiling & Building Project
- compiling once: ``` npm run build ```
- compiling and watching changes: ``` npm run dev ```

## Could be useful 
If you are still getting errors, try following:

* Edit your vHost-File
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

## Module & Submodule
Teeskins is seperated into the code and the database module.  
Clone both with: ```git clone --recursive https://github.com/Teeskins/Teeskins.git```  
Clone the database (submodule) into the code repo with: ```git submodule update --init --recursive```




## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
