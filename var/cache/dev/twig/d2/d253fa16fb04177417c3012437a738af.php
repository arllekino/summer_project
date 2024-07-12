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

/* lobby_page.html.twig */
class __TwigTemplate_47273ac1e54b7f5789a1edbbede5b8ac extends Template
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
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "lobby_page.html.twig"));

        $this->parent = $this->loadTemplate("base.html.twig", "lobby_page.html.twig", 1);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 2
    public function block_title($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "title"));

        yield "Лобби
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
        yield "\t<link rel=\"stylesheet\" href=\"/style/styleLobbyPage.css\">
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
\t\t\t<div class=\"intro__players\">
\t\t\t\t";
        // line 11
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["userNames"]) || array_key_exists("userNames", $context) ? $context["userNames"] : (function () { throw new RuntimeError('Variable "userNames" does not exist.', 11, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["userName"]) {
            // line 12
            yield "\t\t\t\t\t<div class=\"intro__player\" id=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["userName"], "html", null, true);
            yield "\">
\t\t\t\t\t\t<img src=\"../images/blueFlag200x200.png\" alt=\"Описание картинки\" class=\"flag-image\">
\t\t\t\t\t\t<div class=\"block__user-name\">
\t\t\t\t\t\t\t<span class=\"user-name\">";
            // line 15
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["userName"], "html", null, true);
            yield "</span>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['userName'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 19
        yield "\t\t\t</div>
\t\t\t<div class=\"intro__block\">
\t\t\t\t<div class=\"intro__lobby\">
\t\t\t\t\t<div class=\"intro__head\">
\t\t\t\t\t\t<h1 class=\"intro__header\">Лобби</h1>
\t\t\t\t\t\t<div class=\"intro__menu\">
\t\t\t\t\t\t\t<form action=\"\">
\t\t\t\t\t\t\t\t<button type\"submit\" class=\"intro__settings\"></button>
\t\t\t\t\t\t\t</form>
\t\t\t\t\t\t\t<form action=\"/quit_lobby\" class=\"intro__logout\">
\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"keyRoom\" value=\"";
        // line 29
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["keyRoom"]) || array_key_exists("keyRoom", $context) ? $context["keyRoom"] : (function () { throw new RuntimeError('Variable "keyRoom" does not exist.', 29, $this->source); })()), "html", null, true);
        yield "\"/>
\t\t\t\t\t\t\t\t<button type=\"submit\" class=\"intro__but logout\">
\t\t\t\t\t\t\t\t\t<span class=\"button-text\">Выйти</span>
\t\t\t\t\t\t\t\t\t<img src=\"../images/home.jpg\" alt=\"Описание картинки\" class=\"button-image\">
\t\t\t\t\t\t\t\t</button>
\t\t\t\t\t\t\t</form>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"intro__block-code\">
\t\t\t\t\t\t<p class=\"intro__code\">";
        // line 38
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["keyRoom"]) || array_key_exists("keyRoom", $context) ? $context["keyRoom"] : (function () { throw new RuntimeError('Variable "keyRoom" does not exist.', 38, $this->source); })()), "html", null, true);
        yield "</p>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t<form action=\"/main_game\" class=\"intro__play\">
\t\t\t\t\t<button type=\"submit\" class=\"intro__but play\">
\t\t\t\t\t\t<span class=\"button-text2\">Начать игру</span>
\t\t\t\t\t\t<img src=\"../images/sword.svg\" alt=\"Описание картинки\" class=\"button-image2\">
\t\t\t\t\t</button>
\t\t\t\t</form>
\t\t\t</div>
\t\t</div>
\t</div>\t
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    // line 51
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        // line 52
        yield "\t<script type=\"text/javascript\" src=\"/script/websocket/lobby.js\"></script>
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "lobby_page.html.twig";
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
        return array (  172 => 52,  165 => 51,  144 => 38,  132 => 29,  120 => 19,  110 => 15,  103 => 12,  99 => 11,  94 => 8,  87 => 7,  78 => 5,  71 => 4,  56 => 2,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% extends 'base.html.twig' %}
{% block title %}Лобби
{% endblock %}
{% block head %}
\t<link rel=\"stylesheet\" href=\"/style/styleLobbyPage.css\">
{% endblock %}
{% block content %}
\t<div class=\"container\">
\t\t<div class=\"intro\">
\t\t\t<div class=\"intro__players\">
\t\t\t\t{% for userName in userNames %}
\t\t\t\t\t<div class=\"intro__player\" id=\"{{ userName }}\">
\t\t\t\t\t\t<img src=\"../images/blueFlag200x200.png\" alt=\"Описание картинки\" class=\"flag-image\">
\t\t\t\t\t\t<div class=\"block__user-name\">
\t\t\t\t\t\t\t<span class=\"user-name\">{{ userName }}</span>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t{% endfor %}
\t\t\t</div>
\t\t\t<div class=\"intro__block\">
\t\t\t\t<div class=\"intro__lobby\">
\t\t\t\t\t<div class=\"intro__head\">
\t\t\t\t\t\t<h1 class=\"intro__header\">Лобби</h1>
\t\t\t\t\t\t<div class=\"intro__menu\">
\t\t\t\t\t\t\t<form action=\"\">
\t\t\t\t\t\t\t\t<button type\"submit\" class=\"intro__settings\"></button>
\t\t\t\t\t\t\t</form>
\t\t\t\t\t\t\t<form action=\"/quit_lobby\" class=\"intro__logout\">
\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"keyRoom\" value=\"{{ keyRoom }}\"/>
\t\t\t\t\t\t\t\t<button type=\"submit\" class=\"intro__but logout\">
\t\t\t\t\t\t\t\t\t<span class=\"button-text\">Выйти</span>
\t\t\t\t\t\t\t\t\t<img src=\"../images/home.jpg\" alt=\"Описание картинки\" class=\"button-image\">
\t\t\t\t\t\t\t\t</button>
\t\t\t\t\t\t\t</form>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"intro__block-code\">
\t\t\t\t\t\t<p class=\"intro__code\">{{ keyRoom }}</p>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t<form action=\"/main_game\" class=\"intro__play\">
\t\t\t\t\t<button type=\"submit\" class=\"intro__but play\">
\t\t\t\t\t\t<span class=\"button-text2\">Начать игру</span>
\t\t\t\t\t\t<img src=\"../images/sword.svg\" alt=\"Описание картинки\" class=\"button-image2\">
\t\t\t\t\t</button>
\t\t\t\t</form>
\t\t\t</div>
\t\t</div>
\t</div>\t
{% endblock %}
{% block javascripts %}
\t<script type=\"text/javascript\" src=\"/script/websocket/lobby.js\"></script>
{% endblock %}
", "lobby_page.html.twig", "D:\\GameProject\\summer_project\\templates\\lobby_page.html.twig");
    }
}
