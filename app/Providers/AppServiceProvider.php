<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Tweet;

use App\Policies\UserPolicy;

use Illuminate\Support\Facades\Broadcast;

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

        // Gate::define("admin", function (User $user) {
        //     return (bool) $user->is_admin;
        // });

        Paginator::useBootstrapFive();

        Broadcast::routes(['prefix' => 'api', 'middleware' => 'auth:sanctum']);

        require base_path('routes/channels.php');

        // if(config('debugbar.enabled')) {
        //     \Debugbar::getJavascriptRenderer()->setAjaxHandlerAutoShow(false);
        // }
    }

}
