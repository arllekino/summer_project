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

/* login_form.html.twig */
class __TwigTemplate_37a0a0cc3a836a5c40db672dbaddfe1b extends Template
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
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "login_form.html.twig"));

        $this->parent = $this->loadTemplate("base.html.twig", "login_form.html.twig", 1);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

    }

    // line 2
    public function block_title($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "title"));

        yield "Вход
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
        yield "\t<link rel=\"stylesheet\" href=\"/style/styleLoginForm.css\">
\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\">
";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    // line 8
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        // line 9
        yield "\t<form action=\"/login_user\" class=\"container\" name=\"logForm\" id=\"logForm\">
\t\t<div class=\"intro\">
\t\t\t<div class=\"intro__block\">
\t\t\t\t<h1 class=\"intro__header\">Войти</h1>
\t\t\t\t";
        // line 13
        $context["message"] = ((array_key_exists("message", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["message"]) || array_key_exists("message", $context) ? $context["message"] : (function () { throw new RuntimeError('Variable "message" does not exist.', 13, $this->source); })()), [])) : ([]));
        // line 14
        yield "\t\t\t\t";
        if ((isset($context["message"]) || array_key_exists("message", $context) ? $context["message"] : (function () { throw new RuntimeError('Variable "message" does not exist.', 14, $this->source); })())) {
            // line 15
            yield "\t\t\t\t\t<div class=\"status-of-form\">
\t\t\t\t\t\t<span class=\"status-of-form__mess\">";
            // line 16
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((isset($context["message"]) || array_key_exists("message", $context) ? $context["message"] : (function () { throw new RuntimeError('Variable "message" does not exist.', 16, $this->source); })()), "html", null, true);
            yield "</span>
\t\t\t\t\t</div>
\t\t\t\t";
        }
        // line 19
        yield "\t\t\t\t<div class=\"intro__login\">
\t\t\t\t\t<div class=\"intro__form-group\">
\t\t\t\t\t\t<input type=\"email\" name=\"email\" id=\"email\" class=\"intro__input intro__input-email\" placeholder=\"Почта\">
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"intro__form-group intro__pass\">
\t\t\t\t\t\t<input type=\"password\" name=\"password\" id=\"password\" class=\"intro__input intro__input-password\" placeholder=\"Пароль\">
\t\t\t\t\t\t<span class=\"show-password\" id=\"show-password\">
\t\t\t\t\t\t\t<i class=\"fa fa-eye-slash\"></i>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"intro__section\">
\t\t\t\t\t\t<button type=\"submit\" class=\"intro__but intro__but-login\">OK</button>
\t\t\t\t\t\t<div class=\"intro__registrate\">
\t\t\t\t\t\t\t<label class=\"intro__subtitle\">Нет аккаунта?</label>
\t\t\t\t\t\t\t<a href=\"/register_form\" class=\"intro__but-registrate\">Регистрация</a>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>

\t\t\t</div>
\t\t</form>
\t";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    // line 41
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        // line 42
        yield "\t\t<script defer src=\"/script/showPassword.js\"></script>
\t";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "login_form.html.twig";
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
        return array (  151 => 42,  144 => 41,  115 => 19,  109 => 16,  106 => 15,  103 => 14,  101 => 13,  95 => 9,  88 => 8,  78 => 5,  71 => 4,  56 => 2,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% extends 'base.html.twig' %}
{% block title %}Вход
{% endblock %}
{% block head %}
\t<link rel=\"stylesheet\" href=\"/style/styleLoginForm.css\">
\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\">
{% endblock %}
{% block content %}
\t<form action=\"/login_user\" class=\"container\" name=\"logForm\" id=\"logForm\">
\t\t<div class=\"intro\">
\t\t\t<div class=\"intro__block\">
\t\t\t\t<h1 class=\"intro__header\">Войти</h1>
\t\t\t\t{% set message = message|default({}) %}
\t\t\t\t{% if message %}
\t\t\t\t\t<div class=\"status-of-form\">
\t\t\t\t\t\t<span class=\"status-of-form__mess\">{{ message }}</span>
\t\t\t\t\t</div>
\t\t\t\t{% endif %}
\t\t\t\t<div class=\"intro__login\">
\t\t\t\t\t<div class=\"intro__form-group\">
\t\t\t\t\t\t<input type=\"email\" name=\"email\" id=\"email\" class=\"intro__input intro__input-email\" placeholder=\"Почта\">
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"intro__form-group intro__pass\">
\t\t\t\t\t\t<input type=\"password\" name=\"password\" id=\"password\" class=\"intro__input intro__input-password\" placeholder=\"Пароль\">
\t\t\t\t\t\t<span class=\"show-password\" id=\"show-password\">
\t\t\t\t\t\t\t<i class=\"fa fa-eye-slash\"></i>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"intro__section\">
\t\t\t\t\t\t<button type=\"submit\" class=\"intro__but intro__but-login\">OK</button>
\t\t\t\t\t\t<div class=\"intro__registrate\">
\t\t\t\t\t\t\t<label class=\"intro__subtitle\">Нет аккаунта?</label>
\t\t\t\t\t\t\t<a href=\"/register_form\" class=\"intro__but-registrate\">Регистрация</a>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>

\t\t\t</div>
\t\t</form>
\t{% endblock %}
\t{% block javascripts %}
\t\t<script defer src=\"/script/showPassword.js\"></script>
\t{% endblock %}
", "login_form.html.twig", "C:\\Users\\Anton\\EdgeOfFate\\main\\summer_project\\templates\\login_form.html.twig");
    }
}
