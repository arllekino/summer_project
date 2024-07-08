<?php

namespace ContainerXje55yc;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getLobbyPlaceControllerService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'App\Controller\LobbyPlaceController' shared autowired service.
     *
     * @return \App\Controller\LobbyPlaceController
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'vendor'.\DIRECTORY_SEPARATOR.'symfony'.\DIRECTORY_SEPARATOR.'framework-bundle'.\DIRECTORY_SEPARATOR.'Controller'.\DIRECTORY_SEPARATOR.'AbstractController.php';
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Controller'.\DIRECTORY_SEPARATOR.'LobbyPlaceController.php';
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Service'.\DIRECTORY_SEPARATOR.'LobbyPlaceService.php';
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Repository'.\DIRECTORY_SEPARATOR.'LobbyPlaceRepository.php';

        $a = ($container->privates['App\\Service\\UserService'] ?? $container->load('getUserServiceService'));

        $container->services['App\\Controller\\LobbyPlaceController'] = $instance = new \App\Controller\LobbyPlaceController(($container->privates['App\\Controller\\SessionController'] ?? $container->load('getSessionControllerService')), $a, new \App\Service\LobbyPlaceService(new \App\Repository\LobbyPlaceRepository(($container->services['doctrine.orm.default_entity_manager'] ?? $container->load('getDoctrine_Orm_DefaultEntityManagerService'))), $a));

        $instance->setContainer(($container->privates['.service_locator.mx0UMmY'] ?? $container->load('get_ServiceLocator_Mx0UMmYService'))->withContext('App\\Controller\\LobbyPlaceController', $container));

        return $instance;
    }
}
