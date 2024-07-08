<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ErrorController extends AbstractController
{
    public function onError(Request $request): Response
    {
        return $this->render(
            'error_page.html.twig', [
                'messageCode' => $request->get('errorCode'),
                'message' => $request->get('message')
        ]);    
    }
}