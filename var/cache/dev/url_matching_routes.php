<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/register_form' => [[['_route' => 'register_form', '_controller' => 'App\\Controller\\UserController::registerForm'], null, null, null, false, false, null]],
        '/register_user' => [[['_route' => 'register_user', '_controller' => 'App\\Controller\\UserController::registerUser'], null, ['GET' => 0], null, false, false, null]],
        '/login_form' => [[['_route' => 'login_form', '_controller' => 'App\\Controller\\UserController::logInForm'], null, null, null, false, false, null]],
        '/login_user' => [[['_route' => 'login_user', '_controller' => 'App\\Controller\\UserController::logInUser'], null, ['GET' => 0], null, false, false, null]],
        '/logout' => [[['_route' => 'logout', '_controller' => 'App\\Controller\\UserController::logout'], null, null, null, false, false, null]],
        '/start_lobby_page' => [[['_route' => 'start_lobby_page', '_controller' => 'App\\Controller\\LobbyPlaceController::startLobbyPage'], null, null, null, false, false, null]],
        '/create_lobby' => [[['_route' => 'create_lobby', '_controller' => 'App\\Controller\\LobbyPlaceController::createLobby'], null, null, null, false, false, null]],
        '/join_lobby' => [[['_route' => 'join_lobby', '_controller' => 'App\\Controller\\LobbyPlaceController::joinLobby'], null, null, null, false, false, null]],
        '/quit_lobby' => [[['_route' => 'quit_lobby', '_controller' => 'App\\Controller\\LobbyPlaceController::quitFromLooby'], null, null, null, false, false, null]],
        '/main_game' => [[['_route' => 'main_game', '_controller' => 'App\\Controller\\UserController::mainGame'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:35)'
                .'|/lobby_page/([^/]++)(*:62)'
                .'|/error_page/([^/]++)(*:89)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        35 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        62 => [[['_route' => 'lobby_page', '_controller' => 'App\\Controller\\LobbyPlaceController::lobbyPage'], ['keyRoom'], ['GET' => 0], null, false, true, null]],
        89 => [
            [['_route' => 'error_page', '_controller' => 'App\\Controller\\ErrorController::onError'], ['messageCode'], ['GET' => 0], null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
