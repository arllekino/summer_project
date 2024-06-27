<?php
declare(strict_types=1);

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    public function logInForm(AuthenticationUtils $authenticationUtils, Request $request): Response
    {
        $user = $this->getUser();
        if ($user)
        {
            return $this->redirectToRoute(
                'start_lobby_page', [
                    'userId' => $user->getUserId()
                ]);
        }    
        
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUserName = $authenticationUtils->getLastUsername();
        var_dump($lastUserName);
        return $this->render('log_in_form.html.twig',[
            'last_username' =>$lastUserName,
            'errors' => $error
        ]);
    }
}