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
        '/find_username' => [[['_route' => 'find_username', '_controller' => 'App\\Controller\\UserController::findUsername'], null, null, null, false, false, null]],
        '/start_lobby_page' => [[['_route' => 'start_lobby_page', '_controller' => 'App\\Controller\\LobbyPlaceController::startLobbyPage'], null, null, null, false, false, null]],
        '/create_lobby' => [[['_route' => 'create_lobby', '_controller' => 'App\\Controller\\LobbyPlaceController::createLobby'], null, null, null, false, false, null]],
        '/join_lobby' => [[['_route' => 'join_lobby', '_controller' => 'App\\Controller\\LobbyPlaceController::joinLobby'], null, null, null, false, false, null]],
        '/find_key_room' => [[['_route' => 'find_key_room', '_controller' => 'App\\Controller\\LobbyPlaceController::findKeyRoom'], null, null, null, false, false, null]],
        '/quit_lobby' => [[['_route' => 'quit_lobby', '_controller' => 'App\\Controller\\LobbyPlaceController::quitFromLooby'], null, null, null, false, false, null]],
        '/kick_from_lobby' => [[['_route' => 'kick_from_lobby', '_controller' => 'App\\Controller\\LobbyPlaceController::kickFromLobby'], null, ['POST' => 0], null, false, false, null]],
        '/start_game' => [[['_route' => 'start_game', '_controller' => 'App\\Controller\\GameController::startGame'], null, ['GET' => 0], null, false, false, null]],
        '/create_map' => [[['_route' => 'create_map', '_controller' => 'App\\Controller\\GameController::createGameMap'], null, ['GET' => 0], null, false, false, null]],
        '/find_map' => [[['_route' => 'find_map', '_controller' => 'App\\Controller\\GameController::findGameMap'], null, ['POST' => 0], null, false, false, null]],
        '/update_map' => [[['_route' => 'update_map', '_controller' => 'App\\Controller\\GameController::updateGameMap'], null, ['GET' => 0], null, false, false, null]],
        '/end_game' => [[['_route' => 'end_game', '_controller' => 'App\\Controller\\GameController::endGame'], null, null, null, false, false, null]],
        '/find_count_players' => [[['_route' => 'find_count_players', '_controller' => 'App\\Controller\\GameController::findCountPLayersInLobby'], null, ['POST' => 0], null, false, false, null]],
        '/get_player_status' => [[['_route' => 'get_player_status', '_controller' => 'App\\Controller\\GameController::getPlayerStatus'], null, ['POST' => 0], null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:35)'
                .'|/lobby_page/([^/]++)(*:62)'
                .'|/main_game/([^/]++)(*:88)'
                .'|/error_page/([^/]++)(*:115)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        35 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        62 => [[['_route' => 'lobby_page', '_controller' => 'App\\Controller\\LobbyPlaceController::lobbyPage'], ['keyRoom'], ['GET' => 0], null, false, true, null]],
        88 => [[['_route' => 'main_game', '_controller' => 'App\\Controller\\GameController::mainGame'], ['keyRoom'], null, null, false, true, null]],
        115 => [
            [['_route' => 'error_page', '_controller' => 'App\\Controller\\ErrorController::onError'], ['messageCode'], ['GET' => 0], null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
