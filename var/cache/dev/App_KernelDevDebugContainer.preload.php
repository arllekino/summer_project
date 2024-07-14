<?php

// This file has been auto-generated by the Symfony Dependency Injection Component
// You can reference it in the "opcache.preload" php.ini setting on PHP >= 7.4 when preloading is desired

use Symfony\Component\DependencyInjection\Dumper\Preloader;

if (in_array(PHP_SAPI, ['cli', 'phpdbg'], true)) {
    return;
}

require dirname(__DIR__, 3).''.\DIRECTORY_SEPARATOR.'vendor/autoload.php';
(require __DIR__.'/App_KernelDevDebugContainer.php')->set(\ContainerOOv1aVJ\App_KernelDevDebugContainer::class, null);
require __DIR__.'/ContainerOOv1aVJ/getTwig_Runtime_SecurityCsrfService.php';
require __DIR__.'/ContainerOOv1aVJ/getTwig_Runtime_HttpkernelService.php';
require __DIR__.'/ContainerOOv1aVJ/getTwig_Form_RendererService.php';
require __DIR__.'/ContainerOOv1aVJ/getTwig_Form_EngineService.php';
require __DIR__.'/ContainerOOv1aVJ/getSession_FactoryService.php';
require __DIR__.'/ContainerOOv1aVJ/getServicesResetterService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_User_Provider_Concrete_UserProviderService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_PasswordHasherFactoryService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Logout_Listener_CsrfTokenClearingService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Listener_UserProviderService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Listener_UserChecker_MainService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Listener_Session_MainService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Listener_PasswordMigratingService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Listener_Main_UserProviderService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Listener_CsrfProtectionService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Listener_CheckAuthenticatorCredentialsService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Firewall_Map_Context_MainService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Firewall_Map_Context_DevService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_Csrf_TokenStorageService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_ChannelListenerService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecurity_AccessListenerService.php';
require __DIR__.'/ContainerOOv1aVJ/getSecrets_VaultService.php';
require __DIR__.'/ContainerOOv1aVJ/getRouting_LoaderService.php';
require __DIR__.'/ContainerOOv1aVJ/getPropertyAccessorService.php';
require __DIR__.'/ContainerOOv1aVJ/getFragment_Renderer_InlineService.php';
require __DIR__.'/ContainerOOv1aVJ/getForm_TypeGuesser_DoctrineService.php';
require __DIR__.'/ContainerOOv1aVJ/getForm_TypeExtension_Form_HttpFoundationService.php';
require __DIR__.'/ContainerOOv1aVJ/getForm_TypeExtension_CsrfService.php';
require __DIR__.'/ContainerOOv1aVJ/getForm_Type_FormService.php';
require __DIR__.'/ContainerOOv1aVJ/getForm_Type_EntityService.php';
require __DIR__.'/ContainerOOv1aVJ/getForm_Type_ColorService.php';
require __DIR__.'/ContainerOOv1aVJ/getForm_Type_ChoiceService.php';
require __DIR__.'/ContainerOOv1aVJ/getForm_ServerParamsService.php';
require __DIR__.'/ContainerOOv1aVJ/getForm_RegistryService.php';
require __DIR__.'/ContainerOOv1aVJ/getForm_ChoiceListFactory_CachedService.php';
require __DIR__.'/ContainerOOv1aVJ/getErrorController2Service.php';
require __DIR__.'/ContainerOOv1aVJ/getDoctrine_UuidGeneratorService.php';
require __DIR__.'/ContainerOOv1aVJ/getDoctrine_UlidGeneratorService.php';
require __DIR__.'/ContainerOOv1aVJ/getDoctrine_Orm_Listeners_PdoCacheAdapterDoctrineSchemaSubscriberService.php';
require __DIR__.'/ContainerOOv1aVJ/getDoctrine_Orm_Listeners_DoctrineTokenProviderSchemaSubscriberService.php';
require __DIR__.'/ContainerOOv1aVJ/getDoctrine_Orm_Listeners_DoctrineDbalCacheAdapterSchemaSubscriberService.php';
require __DIR__.'/ContainerOOv1aVJ/getDoctrine_Orm_DefaultXmlMetadataDriverService.php';
require __DIR__.'/ContainerOOv1aVJ/getDoctrine_Orm_DefaultListeners_AttachEntityListenersService.php';
require __DIR__.'/ContainerOOv1aVJ/getDoctrine_Orm_DefaultEntityManagerService.php';
require __DIR__.'/ContainerOOv1aVJ/getDoctrine_Dbal_DefaultConnectionService.php';
require __DIR__.'/ContainerOOv1aVJ/getDoctrineService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_Security_Voter_VoteListenerService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_Security_Voter_Security_Access_SimpleRoleVoterService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_Security_Voter_Security_Access_AuthenticatedVoterService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_Security_UserValueResolverService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_Security_Firewall_Authenticator_MainService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_Security_Access_DecisionManagerService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_ArgumentResolver_VariadicService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_ArgumentResolver_SessionService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_ArgumentResolver_ServiceService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_ArgumentResolver_RequestAttributeService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_ArgumentResolver_RequestService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_ArgumentResolver_NotTaggedControllerService.php';
require __DIR__.'/ContainerOOv1aVJ/getDebug_ArgumentResolver_DefaultService.php';
require __DIR__.'/ContainerOOv1aVJ/getContainer_EnvVarProcessorsLocatorService.php';
require __DIR__.'/ContainerOOv1aVJ/getContainer_EnvVarProcessorService.php';
require __DIR__.'/ContainerOOv1aVJ/getCache_SystemClearerService.php';
require __DIR__.'/ContainerOOv1aVJ/getCache_SystemService.php';
require __DIR__.'/ContainerOOv1aVJ/getCache_GlobalClearerService.php';
require __DIR__.'/ContainerOOv1aVJ/getCache_AppClearerService.php';
require __DIR__.'/ContainerOOv1aVJ/getCache_AppService.php';
require __DIR__.'/ContainerOOv1aVJ/getTemplateControllerService.php';
require __DIR__.'/ContainerOOv1aVJ/getRedirectControllerService.php';
require __DIR__.'/ContainerOOv1aVJ/getUserServiceService.php';
require __DIR__.'/ContainerOOv1aVJ/getLobbyPlaceServiceService.php';
require __DIR__.'/ContainerOOv1aVJ/getUserControllerService.php';
require __DIR__.'/ContainerOOv1aVJ/getSessionControllerService.php';
require __DIR__.'/ContainerOOv1aVJ/getLobbyPlaceControllerService.php';
require __DIR__.'/ContainerOOv1aVJ/getIslandControllerService.php';
require __DIR__.'/ContainerOOv1aVJ/getGameControllerService.php';
require __DIR__.'/ContainerOOv1aVJ/getErrorControllerService.php';
require __DIR__.'/ContainerOOv1aVJ/get_Session_DeprecatedService.php';
require __DIR__.'/ContainerOOv1aVJ/get_ServiceLocator_XUrKPVUService.php';
require __DIR__.'/ContainerOOv1aVJ/get_ServiceLocator_Mx0UMmYService.php';
require __DIR__.'/ContainerOOv1aVJ/get_ServiceLocator_THndrlService.php';
require __DIR__.'/ContainerOOv1aVJ/get_Container_Private_TwigService.php';
require __DIR__.'/ContainerOOv1aVJ/get_Container_Private_SessionService.php';
require __DIR__.'/ContainerOOv1aVJ/get_Container_Private_Security_Csrf_TokenManagerService.php';
require __DIR__.'/ContainerOOv1aVJ/get_Container_Private_Security_AuthorizationCheckerService.php';
require __DIR__.'/ContainerOOv1aVJ/get_Container_Private_Form_Type_FileService.php';
require __DIR__.'/ContainerOOv1aVJ/get_Container_Private_Form_FactoryService.php';
require __DIR__.'/ContainerOOv1aVJ/get_Container_Private_FilesystemService.php';
require __DIR__.'/ContainerOOv1aVJ/get_Container_Private_CacheClearerService.php';

$classes = [];
$classes[] = 'Symfony\Bundle\FrameworkBundle\FrameworkBundle';
$classes[] = 'Symfony\Bundle\TwigBundle\TwigBundle';
$classes[] = 'Doctrine\Bundle\DoctrineBundle\DoctrineBundle';
$classes[] = 'Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle';
$classes[] = 'Symfony\Bundle\MakerBundle\MakerBundle';
$classes[] = 'Symfony\Bundle\SecurityBundle\SecurityBundle';
$classes[] = 'Symfony\Component\HttpKernel\CacheClearer\ChainCacheClearer';
$classes[] = 'Symfony\Component\Filesystem\Filesystem';
$classes[] = 'Symfony\Component\Form\FormFactory';
$classes[] = 'Symfony\Component\Form\Extension\Core\Type\FileType';
$classes[] = 'Symfony\Component\Security\Core\Authorization\AuthorizationChecker';
$classes[] = 'Symfony\Component\Security\Csrf\CsrfTokenManager';
$classes[] = 'Symfony\Component\Security\Csrf\TokenGenerator\UriSafeTokenGenerator';
$classes[] = 'Symfony\Component\Security\Core\Authentication\Token\Storage\UsageTrackingTokenStorage';
$classes[] = 'Symfony\Component\DependencyInjection\ServiceLocator';
$classes[] = 'Symfony\Component\HttpFoundation\Session\Session';
$classes[] = 'Twig\Cache\FilesystemCache';
$classes[] = 'Twig\Extension\CoreExtension';
$classes[] = 'Twig\Extension\EscaperExtension';
$classes[] = 'Twig\Extension\OptimizerExtension';
$classes[] = 'Twig\Extension\StagingExtension';
$classes[] = 'Twig\ExtensionSet';
$classes[] = 'Twig\Template';
$classes[] = 'Twig\TemplateWrapper';
$classes[] = 'Twig\Environment';
$classes[] = 'Twig\Loader\FilesystemLoader';
$classes[] = 'Symfony\Bridge\Twig\Extension\CsrfExtension';
$classes[] = 'Symfony\Bridge\Twig\Extension\ProfilerExtension';
$classes[] = 'Twig\Profiler\Profile';
$classes[] = 'Symfony\Bridge\Twig\Extension\TranslationExtension';
$classes[] = 'Symfony\Bridge\Twig\Extension\CodeExtension';
$classes[] = 'Symfony\Bridge\Twig\Extension\RoutingExtension';
$classes[] = 'Symfony\Bridge\Twig\Extension\YamlExtension';
$classes[] = 'Symfony\Bridge\Twig\Extension\StopwatchExtension';
$classes[] = 'Symfony\Bridge\Twig\Extension\HttpKernelExtension';
$classes[] = 'Symfony\Bridge\Twig\Extension\HttpFoundationExtension';
$classes[] = 'Symfony\Component\HttpFoundation\UrlHelper';
$classes[] = 'Symfony\Bridge\Twig\Extension\FormExtension';
$classes[] = 'Symfony\Bridge\Twig\Extension\LogoutUrlExtension';
$classes[] = 'Symfony\Bridge\Twig\Extension\SecurityExtension';
$classes[] = 'Symfony\Component\Security\Http\Impersonate\ImpersonateUrlGenerator';
$classes[] = 'Twig\Extension\DebugExtension';
$classes[] = 'Doctrine\Bundle\DoctrineBundle\Twig\DoctrineExtension';
$classes[] = 'Symfony\Bridge\Twig\AppVariable';
$classes[] = 'Twig\RuntimeLoader\ContainerRuntimeLoader';
$classes[] = 'Symfony\Bundle\TwigBundle\DependencyInjection\Configurator\EnvironmentConfigurator';
$classes[] = 'Symfony\Component\HttpFoundation\RequestMatcher';
$classes[] = 'Symfony\Component\HttpFoundation\Session\SessionInterface';
$classes[] = 'Symfony\Bundle\FrameworkBundle\Session\DeprecatedSessionFactory';
$classes[] = 'App\Controller\ErrorController';
$classes[] = 'App\Controller\GameController';
$classes[] = 'App\Service\GameMapService';
$classes[] = 'App\Repository\GameMapRepository';
$classes[] = 'App\Controller\IslandController';
$classes[] = 'App\Service\IslandService';
$classes[] = 'App\Repository\IslandRepository';
$classes[] = 'App\Controller\LobbyPlaceController';
$classes[] = 'App\Controller\SessionController';
$classes[] = 'App\Controller\UserController';
$classes[] = 'App\Service\LobbyPlaceService';
$classes[] = 'App\Repository\LobbyPlaceRepository';
$classes[] = 'App\Service\PasswordHasher';
$classes[] = 'App\Service\UserService';
$classes[] = 'App\Repository\UserRepository';
$classes[] = 'Symfony\Bundle\FrameworkBundle\Controller\RedirectController';
$classes[] = 'Symfony\Bundle\FrameworkBundle\Controller\TemplateController';
$classes[] = 'Symfony\Component\Cache\Adapter\FilesystemAdapter';
$classes[] = 'Symfony\Component\Cache\Marshaller\DefaultMarshaller';
$classes[] = 'Symfony\Component\HttpKernel\CacheClearer\Psr6CacheClearer';
$classes[] = 'Symfony\Component\Cache\Adapter\ArrayAdapter';
$classes[] = 'Symfony\Component\Cache\Adapter\AdapterInterface';
$classes[] = 'Symfony\Component\Cache\Adapter\AbstractAdapter';
$classes[] = 'Symfony\Component\Config\Resource\SelfCheckingResourceChecker';
$classes[] = 'Symfony\Component\DependencyInjection\EnvVarProcessor';
$classes[] = 'Symfony\Component\HttpKernel\Controller\ArgumentResolver\TraceableValueResolver';
$classes[] = 'Symfony\Component\HttpKernel\Controller\ArgumentResolver\DefaultValueResolver';
$classes[] = 'Symfony\Component\HttpKernel\Controller\ArgumentResolver\NotTaggedControllerValueResolver';
$classes[] = 'Symfony\Component\HttpKernel\Controller\ArgumentResolver\RequestValueResolver';
$classes[] = 'Symfony\Component\HttpKernel\Controller\ArgumentResolver\RequestAttributeValueResolver';
$classes[] = 'Symfony\Component\HttpKernel\Controller\ArgumentResolver\ServiceValueResolver';
$classes[] = 'Symfony\Component\HttpKernel\Controller\ArgumentResolver\SessionValueResolver';
$classes[] = 'Symfony\Component\HttpKernel\Controller\ArgumentResolver\VariadicValueResolver';
$classes[] = 'Symfony\Component\HttpKernel\EventListener\DebugHandlersListener';
$classes[] = 'Symfony\Component\HttpKernel\Debug\FileLinkFormatter';
$classes[] = 'Symfony\Component\Security\Core\Authorization\TraceableAccessDecisionManager';
$classes[] = 'Symfony\Component\Security\Core\Authorization\AccessDecisionManager';
$classes[] = 'Symfony\Component\Security\Core\Authorization\Strategy\AffirmativeStrategy';
$classes[] = 'Symfony\Bundle\SecurityBundle\Debug\TraceableFirewallListener';
$classes[] = 'Symfony\Component\Security\Http\Authenticator\Debug\TraceableAuthenticatorManagerListener';
$classes[] = 'Symfony\Component\Security\Http\Firewall\AuthenticatorManagerListener';
$classes[] = 'Symfony\Component\Security\Http\Authentication\AuthenticatorManager';
$classes[] = 'Symfony\Component\Security\Http\Controller\UserValueResolver';
$classes[] = 'Symfony\Component\Security\Core\Authorization\Voter\TraceableVoter';
$classes[] = 'Symfony\Component\Security\Core\Authorization\Voter\AuthenticatedVoter';
$classes[] = 'Symfony\Component\Security\Core\Authorization\Voter\RoleVoter';
$classes[] = 'Symfony\Bundle\SecurityBundle\EventListener\VoteListener';
$classes[] = 'Symfony\Component\Stopwatch\Stopwatch';
$classes[] = 'Symfony\Component\DependencyInjection\Config\ContainerParametersResourceChecker';
$classes[] = 'Symfony\Component\HttpKernel\EventListener\DisallowRobotsIndexingListener';
$classes[] = 'Doctrine\Bundle\DoctrineBundle\Registry';
$classes[] = 'Doctrine\DBAL\Connection';
$classes[] = 'Doctrine\Bundle\DoctrineBundle\ConnectionFactory';
$classes[] = 'Doctrine\DBAL\Configuration';
$classes[] = 'Doctrine\DBAL\Schema\DefaultSchemaManagerFactory';
$classes[] = 'Doctrine\Bundle\DoctrineBundle\Middleware\DebugMiddleware';
$classes[] = 'Doctrine\DBAL\Tools\DsnParser';
$classes[] = 'Doctrine\Bundle\DoctrineBundle\Middleware\BacktraceDebugDataHolder';
$classes[] = 'Doctrine\ORM\Proxy\Autoloader';
$classes[] = 'Doctrine\ORM\EntityManager';
$classes[] = 'Doctrine\ORM\Configuration';
$classes[] = 'Doctrine\Bundle\DoctrineBundle\Mapping\MappingDriver';
$classes[] = 'Doctrine\Persistence\Mapping\Driver\MappingDriverChain';
$classes[] = 'Doctrine\ORM\Mapping\UnderscoreNamingStrategy';
$classes[] = 'Doctrine\ORM\Mapping\DefaultQuoteStrategy';
$classes[] = 'Doctrine\Bundle\DoctrineBundle\Mapping\ContainerEntityListenerResolver';
$classes[] = 'Doctrine\Bundle\DoctrineBundle\Repository\ContainerRepositoryFactory';
$classes[] = 'Symfony\Bridge\Doctrine\ContainerAwareEventManager';
$classes[] = 'Doctrine\Bundle\DoctrineBundle\ManagerConfigurator';
$classes[] = 'Doctrine\ORM\Tools\AttachEntityListenersListener';
$classes[] = 'Doctrine\ORM\Mapping\Driver\SimplifiedXmlDriver';
$classes[] = 'Symfony\Bridge\Doctrine\SchemaListener\DoctrineDbalCacheAdapterSchemaSubscriber';
$classes[] = 'Symfony\Bridge\Doctrine\SchemaListener\RememberMeTokenProviderDoctrineSchemaSubscriber';
$classes[] = 'Symfony\Bridge\Doctrine\SchemaListener\PdoCacheAdapterDoctrineSchemaSubscriber';
$classes[] = 'Symfony\Bridge\Doctrine\IdGenerator\UlidGenerator';
$classes[] = 'Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator';
$classes[] = 'Symfony\Component\HttpKernel\Controller\ErrorController';
$classes[] = 'Symfony\Bridge\Twig\ErrorRenderer\TwigErrorRenderer';
$classes[] = 'Symfony\Component\ErrorHandler\ErrorRenderer\HtmlErrorRenderer';
$classes[] = 'Symfony\Component\HttpKernel\Debug\TraceableEventDispatcher';
$classes[] = 'Symfony\Component\EventDispatcher\EventDispatcher';
$classes[] = 'Symfony\Component\HttpKernel\EventListener\ErrorListener';
$classes[] = 'Symfony\Component\Form\ChoiceList\Factory\CachingFactoryDecorator';
$classes[] = 'Symfony\Component\Form\ChoiceList\Factory\PropertyAccessDecorator';
$classes[] = 'Symfony\Component\Form\ChoiceList\Factory\DefaultChoiceListFactory';
$classes[] = 'Symfony\Component\Form\FormRegistry';
$classes[] = 'Symfony\Component\Form\Extension\DependencyInjection\DependencyInjectionExtension';
$classes[] = 'Symfony\Component\Form\ResolvedFormTypeFactory';
$classes[] = 'Symfony\Component\Form\Util\ServerParams';
$classes[] = 'Symfony\Component\Form\Extension\Core\Type\ChoiceType';
$classes[] = 'Symfony\Component\Form\Extension\Core\Type\ColorType';
$classes[] = 'Symfony\Bridge\Doctrine\Form\Type\EntityType';
$classes[] = 'Symfony\Component\Form\Extension\Core\Type\FormType';
$classes[] = 'Symfony\Component\Form\Extension\Csrf\Type\FormTypeCsrfExtension';
$classes[] = 'Symfony\Component\Form\Extension\HttpFoundation\Type\FormTypeHttpFoundationExtension';
$classes[] = 'Symfony\Component\Form\Extension\HttpFoundation\HttpFoundationRequestHandler';
$classes[] = 'Symfony\Component\Form\Extension\Core\Type\TransformationFailureExtension';
$classes[] = 'Symfony\Component\Form\Extension\Validator\Type\RepeatedTypeValidatorExtension';
$classes[] = 'Symfony\Component\Form\Extension\Validator\Type\SubmitTypeValidatorExtension';
$classes[] = 'Symfony\Bridge\Doctrine\Form\DoctrineOrmTypeGuesser';
$classes[] = 'Symfony\Component\HttpKernel\Fragment\InlineFragmentRenderer';
$classes[] = 'Symfony\Component\Runtime\Runner\Symfony\HttpKernelRunner';
$classes[] = 'Symfony\Component\Runtime\Runner\Symfony\ResponseRunner';
$classes[] = 'Symfony\Component\Runtime\SymfonyRuntime';
$classes[] = 'Symfony\Component\HttpKernel\HttpKernel';
$classes[] = 'Symfony\Component\HttpKernel\Controller\TraceableControllerResolver';
$classes[] = 'Symfony\Bundle\FrameworkBundle\Controller\ControllerResolver';
$classes[] = 'Symfony\Component\HttpKernel\Controller\TraceableArgumentResolver';
$classes[] = 'Symfony\Component\HttpKernel\Controller\ArgumentResolver';
$classes[] = 'Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadataFactory';
$classes[] = 'App\Kernel';
$classes[] = 'Symfony\Component\HttpKernel\EventListener\LocaleAwareListener';
$classes[] = 'Symfony\Component\HttpKernel\EventListener\LocaleListener';
$classes[] = 'Symfony\Component\HttpKernel\Log\Logger';
$classes[] = 'Symfony\Component\DependencyInjection\ParameterBag\ContainerBag';
$classes[] = 'Symfony\Component\PropertyAccess\PropertyAccessor';
$classes[] = 'Symfony\Component\PropertyInfo\Extractor\ReflectionExtractor';
$classes[] = 'Symfony\Component\HttpFoundation\RequestStack';
$classes[] = 'Symfony\Component\HttpKernel\EventListener\ResponseListener';
$classes[] = 'Symfony\Bundle\FrameworkBundle\Routing\Router';
$classes[] = 'Symfony\Component\Config\ResourceCheckerConfigCacheFactory';
$classes[] = 'Symfony\Component\Routing\RequestContext';
$classes[] = 'Symfony\Component\HttpKernel\EventListener\RouterListener';
$classes[] = 'Symfony\Bundle\FrameworkBundle\Routing\DelegatingLoader';
$classes[] = 'Symfony\Component\Config\Loader\LoaderResolver';
$classes[] = 'Symfony\Component\Routing\Loader\XmlFileLoader';
$classes[] = 'Symfony\Component\HttpKernel\Config\FileLocator';
$classes[] = 'Symfony\Component\Routing\Loader\YamlFileLoader';
$classes[] = 'Symfony\Component\Routing\Loader\PhpFileLoader';
$classes[] = 'Symfony\Component\Routing\Loader\GlobFileLoader';
$classes[] = 'Symfony\Component\Routing\Loader\DirectoryLoader';
$classes[] = 'Symfony\Component\Routing\Loader\ContainerLoader';
$classes[] = 'Symfony\Bundle\FrameworkBundle\Routing\AnnotatedRouteControllerLoader';
$classes[] = 'Symfony\Component\Routing\Loader\AnnotationDirectoryLoader';
$classes[] = 'Symfony\Component\Routing\Loader\AnnotationFileLoader';
$classes[] = 'Symfony\Bundle\FrameworkBundle\Secrets\SodiumVault';
$classes[] = 'Symfony\Component\String\LazyString';
$classes[] = 'Symfony\Component\Security\Http\Firewall\AccessListener';
$classes[] = 'Symfony\Component\Security\Http\AccessMap';
$classes[] = 'Symfony\Component\Security\Core\Authentication\AuthenticationTrustResolver';
$classes[] = 'Symfony\Component\Security\Http\Firewall\ChannelListener';
$classes[] = 'Symfony\Component\Security\Http\Firewall\ContextListener';
$classes[] = 'Symfony\Component\Security\Csrf\TokenStorage\SessionTokenStorage';
$classes[] = 'Symfony\Bundle\SecurityBundle\Security\FirewallMap';
$classes[] = 'Symfony\Bundle\SecurityBundle\Security\FirewallContext';
$classes[] = 'Symfony\Bundle\SecurityBundle\Security\FirewallConfig';
$classes[] = 'Symfony\Bundle\SecurityBundle\Security\LazyFirewallContext';
$classes[] = 'Symfony\Component\Security\Http\Firewall\ExceptionListener';
$classes[] = 'Symfony\Component\Security\Http\HttpUtils';
$classes[] = 'Symfony\Component\Security\Http\EventListener\CheckCredentialsListener';
$classes[] = 'Symfony\Component\Security\Http\EventListener\CsrfProtectionListener';
$classes[] = 'Symfony\Component\Security\Http\EventListener\UserProviderListener';
$classes[] = 'Symfony\Component\Security\Http\EventListener\PasswordMigratingListener';
$classes[] = 'Symfony\Component\Security\Http\EventListener\SessionStrategyListener';
$classes[] = 'Symfony\Component\Security\Http\Session\SessionAuthenticationStrategy';
$classes[] = 'Symfony\Component\Security\Http\EventListener\UserCheckerListener';
$classes[] = 'Symfony\Component\Security\Core\User\InMemoryUserChecker';
$classes[] = 'Symfony\Component\Security\Http\EventListener\CsrfTokenClearingLogoutListener';
$classes[] = 'Symfony\Component\Security\Http\Logout\LogoutUrlGenerator';
$classes[] = 'Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory';
$classes[] = 'Symfony\Component\Security\Http\RememberMe\ResponseListener';
$classes[] = 'Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage';
$classes[] = 'Symfony\Bridge\Doctrine\Security\User\EntityUserProvider';
$classes[] = 'Symfony\Component\DependencyInjection\ContainerInterface';
$classes[] = 'Symfony\Component\HttpKernel\DependencyInjection\ServicesResetter';
$classes[] = 'Symfony\Component\HttpFoundation\Session\SessionFactory';
$classes[] = 'Symfony\Component\HttpFoundation\Session\Storage\NativeSessionStorageFactory';
$classes[] = 'Symfony\Component\HttpFoundation\Session\Storage\Handler\StrictSessionHandler';
$classes[] = 'Symfony\Component\HttpFoundation\Session\Storage\MetadataBag';
$classes[] = 'Symfony\Component\HttpKernel\EventListener\SessionListener';
$classes[] = 'Symfony\Component\String\Slugger\AsciiSlugger';
$classes[] = 'Symfony\Component\HttpKernel\EventListener\StreamedResponseListener';
$classes[] = 'Symfony\Bridge\Twig\Form\TwigRendererEngine';
$classes[] = 'Symfony\Component\Form\FormRenderer';
$classes[] = 'Symfony\Bridge\Twig\Extension\HttpKernelRuntime';
$classes[] = 'Symfony\Component\HttpKernel\DependencyInjection\LazyLoadingFragmentHandler';
$classes[] = 'Symfony\Component\HttpKernel\Fragment\FragmentUriGenerator';
$classes[] = 'Symfony\Component\HttpKernel\UriSigner';
$classes[] = 'Symfony\Bridge\Twig\Extension\CsrfRuntime';
$classes[] = 'Symfony\Component\HttpKernel\EventListener\ValidateRequestListener';

$preloaded = Preloader::preload($classes);
