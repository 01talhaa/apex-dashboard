@echo off

:: Navigate to the Nuxt project directory (optional, if needed)
cd /d C:\nuxt\fb-shop

:: Open Git Bash and run the command in the Laravel project
start "" "C:\Program Files\Git\bin\bash.exe" -c "cd /c/laravel/ecommerce-backend && php artisan serve --host=192.168.0.6 --port=8000"
