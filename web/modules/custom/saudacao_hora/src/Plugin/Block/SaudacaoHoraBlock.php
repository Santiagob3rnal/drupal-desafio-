<?php

namespace Drupal\saudacao_hora\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Fornece um bloco com saudação conforme a hora.
 *
 * @Block(
 *   id = "bloco_saudacao_hora",
 *   admin_label = @Translation("Bloco de Saudação por Hora"),
 *   category = @Translation("Personalizado")
 * )
 */
class SaudacaoHoraBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $hora = (int) date('H');

    if ($hora < 12) {
      $mensagem = 'Bom dia!';
    }
    elseif ($hora < 19) {
      $mensagem = 'Boa tarde!';
    }
    else {
      $mensagem = 'Boa noite!';
    }

    return [
      '#theme' => 'saudacao_hora_block',
      '#mensagem' => $mensagem,
      '#cache' => [
        'max-age' => 0,
      ],
    ];
  }

}
