<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* start_lobby_page.html.twig */
class __TwigTemplate_118fe3c6b6e13e26ee81087937bf4d68 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'title' => [$this, 'block_title'],
            'head' => [$this, 'block_head'],
            'content' => [$this, 'block_content'],
            'javascripts' => [$this, 'block_javascripts'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "start_lobby_page.html.twig"));

        $this->parent = $this->loadTemplate("base.html.twig", "start_lobby_page.html.twig", 1);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 2
    public function block_title($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "title"));

        yield "Меню
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    // line 4
    public function block_head($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "head"));

        // line 5
        yield "\t<link rel=\"stylesheet\" href=\"/style/styleStartLobbyPage.css\">
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    // line 7
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        // line 8
        yield "\t<div class=\"container\">
\t\t<div class=\"intro\">
\t\t\t<div class=\"intro__block\">
\t\t\t\t<div class=\"intro__head\">
\t\t\t\t\t<h1 class=\"intro__header\">Edge of Fate</h1>
\t\t\t\t\t<form action=\"\">
\t\t\t\t\t\t<button type\"submit\" class=\"intro__settings\"></button>
\t\t\t\t\t</form>
\t\t\t\t</div>
\t\t\t\t<div class=\"intro__content\">
\t\t\t\t\t<form action=\"/create_lobby\" class=\"intro__content-user\">
\t\t\t\t\t\t<span class=\"user-name\">";
        // line 19
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["userName"]) || array_key_exists("userName", $context) ? $context["userName"] : (function () { throw new RuntimeError('Variable "userName" does not exist.', 19, $this->source); })()), "html", null, true);
        yield "</span>
\t\t\t\t\t\t<button type=\"submit\" class=\"intro__but add-lobby\">Создать лобби</button>
\t\t\t\t\t</form>
\t\t\t\t\t<form action=\"/join_lobby\" class=\"intro__content-lobby\">
\t\t\t\t\t\t<input type=\"text\" name=\"keyRoom\" id=\"key-room\" class=\"key__room\" placeholder=\"Введите код\" maxlength=\"4\"> 
\t\t\t\t\t\t<button type=\"submit\" class=\"intro__but enter-lobby\">Войти в лобби</button>
\t\t\t\t\t</form>
\t\t\t\t</div>
\t\t\t\t<form action=\"/logout\" class=\"intro__content-logout\">
\t\t\t\t\t<button type=\"submit\" class=\"intro__but logout\">
\t\t\t\t\t\t<span class=\"button-text\">Выйти</span>
  \t\t\t\t\t\t<img src=\"../images/home.jpg\" alt=\"Описание картинки\" class=\"button-image\">
\t\t\t\t\t</button>
\t\t\t\t</form>
\t\t\t</div>
\t\t</div>
\t</div>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    // line 37
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        // line 38
        yield "\t<script type=\"text/javascript\" src=\"/script/websocket/startLobby.js\"></script>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "start_lobby_page.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  140 => 38,  133 => 37,  107 => 19,  94 => 8,  87 => 7,  78 => 5,  71 => 4,  56 => 2,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% extends 'base.html.twig' %}
{% block title %}Меню
{% endblock %}
{% block head %}
\t<link rel=\"stylesheet\" href=\"/style/styleStartLobbyPage.css\">
{% endblock %}
{% block content %}
\t<div class=\"container\">
\t\t<div class=\"intro\">
\t\t\t<div class=\"intro__block\">
\t\t\t\t<div class=\"intro__head\">
\t\t\t\t\t<h1 class=\"intro__header\">Edge of Fate</h1>
\t\t\t\t\t<form action=\"\">
\t\t\t\t\t\t<button type\"submit\" class=\"intro__settings\"></button>
\t\t\t\t\t</form>
\t\t\t\t</div>
\t\t\t\t<div class=\"intro__content\">
\t\t\t\t\t<form action=\"/create_lobby\" class=\"intro__content-user\">
\t\t\t\t\t\t<span class=\"user-name\">{{ userName }}</span>
\t\t\t\t\t\t<button type=\"submit\" class=\"intro__but add-lobby\">Создать лобби</button>
\t\t\t\t\t</form>
\t\t\t\t\t<form action=\"/join_lobby\" class=\"intro__content-lobby\">
\t\t\t\t\t\t<input type=\"text\" name=\"keyRoom\" id=\"key-room\" class=\"key__room\" placeholder=\"Введите код\" maxlength=\"4\"> 
\t\t\t\t\t\t<button type=\"submit\" class=\"intro__but enter-lobby\">Войти в лобби</button>
\t\t\t\t\t</form>
\t\t\t\t</div>
\t\t\t\t<form action=\"/logout\" class=\"intro__content-logout\">
\t\t\t\t\t<button type=\"submit\" class=\"intro__but logout\">
\t\t\t\t\t\t<span class=\"button-text\">Выйти</span>
  \t\t\t\t\t\t<img src=\"../images/home.jpg\" alt=\"Описание картинки\" class=\"button-image\">
\t\t\t\t\t</button>
\t\t\t\t</form>
\t\t\t</div>
\t\t</div>
\t</div>
{% endblock %}
{% block javascripts %}
\t<script type=\"text/javascript\" src=\"/script/websocket/startLobby.js\"></script>
{% endblock %}", "start_lobby_page.html.twig", "C:\\Users\\arl\\Desktop\\edge of fates\\my_symfony_app\\templates\\start_lobby_page.html.twig");
    }
}
