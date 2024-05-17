<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Tweet;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define("admin", function (User $user) {
            return (bool) $user->is_admin;
        });

        Paginator::useBootstrapFive();

        if(config('debugbar.enabled')) {
            \Debugbar::getJavascriptRenderer()->setAjaxHandlerAutoShow(false);
        }
    }

}
