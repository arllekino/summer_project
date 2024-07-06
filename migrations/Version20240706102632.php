<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240706102632 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $tableUser = $schema->createTable('user');
    
        $tableUser->addColumn('user_id', Types::INTEGER, ['autoincrement' => true]);
        $tableUser->addColumn('user_name', Types::STRING, ['length' => 200, 'notnull' => true]);
        $tableUser->addColumn('email', Types::STRING, ['length' => 200, 'notnull' => true]);
        $tableUser->addColumn('password', Types::STRING, ['length' => 200, 'notnull' => false]);
    
        $tableUser->setPrimaryKey(['user_id']);
        $tableUser->addUniqueIndex(['email']); 


        $tableIsland = $schema->createTable('island');

        $tableIsland->addColumn('island_id', Types::INTEGER, ['autoincrement' => true]);
        $tableIsland->addColumn('island_matrix', Types::TEXT, ['notnull' => true]);
        $tableIsland->addColumn('food', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('max_food', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('wood', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('max_wood', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('stones', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('max_stones', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('warriors', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('max_warriors', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('villagers', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('hammers', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('money', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('knowledge', Types::INTEGER, ['notnull' => true]);
        $tableIsland->addColumn('user_id', Types::INTEGER, ['notnull' => true]);

        $tableIsland->setPrimaryKey(['island_id']);
        $tableIsland->addUniqueIndex(['user_id']);


        $tableLobby = $schema->createTable('lobby');

        $tableLobby->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $tableLobby->addColumn('lobby_id', Types::INTEGER, ['notnull' => false]);
        $tableLobby->addColumn('player_id', Types::INTEGER, ['notnull' => false]);
        $tableLobby->addColumn('key_room', Types::STRING, ['length' => 4, 'notnull' => false]);
    
        $tableLobby->setPrimaryKey(['id']);
        $tableLobby->addUniqueIndex(['player_id']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('user');
        $schema->dropTable('island');
        $schema->dropTable('lobby');
    }
}
