<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240724110650 extends AbstractMigration
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
        $tableIsland->addColumn('key_room', Types::STRING, ['length' => 4, 'notnull' => true]);

        $tableIsland->setPrimaryKey(['island_id']);
        $tableIsland->addUniqueIndex(['user_id']);


        $tableLobby = $schema->createTable('lobby_place');

        $tableLobby->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $tableLobby->addColumn('lobby_id', Types::INTEGER, ['notnull' => false]);
        $tableLobby->addColumn('player_id', Types::INTEGER, ['notnull' => false]);
        $tableLobby->addColumn('color_flag', Types::STRING, ['length' => 20, 'notnull' => true]);
        $tableLobby->addColumn('key_room', Types::STRING, ['length' => 4, 'notnull' => false]);
        $tableLobby->addColumn('status', Types::STRING, ['length' => 100, 'notnull' => true]);
        $tableLobby->addColumn('lobby_status', Types::STRING, ['length' => 100, 'notnull' => true]);
        $tableLobby->addColumn('readiness', Types::STRING, ['length' => 100, 'notnull' => true]);
    
        $tableLobby->setPrimaryKey(['id']);
        $tableLobby->addUniqueIndex(['player_id']);


        $tableGameMap = $schema->createTable('game_map');

        $tableGameMap->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $tableGameMap->addColumn('key_room', Types::STRING, ['length' => 4, 'notnull' => true]);
        $tableGameMap->addColumn('matrix_game_map', Types::TEXT, ['notnull' => true]);
        $tableGameMap->addColumn('game_status', Types::INTEGER, ['notnull' => true]);

        $tableGameMap->setPrimaryKey(['id']);
        $tableGameMap->addUniqueIndex(['key_room']);


        $tableIslandBuild = $schema->createTable('island_build');

        $tableIslandBuild->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $tableIslandBuild->addColumn('hp', Types::INTEGER, ['notnull' => true]);
        $tableIslandBuild->addColumn('build_type', Types::STRING, ['length' => 50, 'notnull' => true]);
        $tableIslandBuild->addColumn('build_ptr', Types::INTEGER, ['notnull' => true]);
        $tableIslandBuild->addColumn('cell_status_json', Types::STRING, ['length' => 200, 'notnull' => true]);
        $tableIslandBuild->addColumn('illness', Types::BOOLEAN, ['notnull' => true]);
        $tableIslandBuild->addColumn('destroyed', Types::BOOLEAN, ['notnull' => true]);
        $tableIslandBuild->addColumn('user_id', Types::INTEGER, ['notnull' => true]);
        $tableIslandBuild->addColumn('key_room', Types::STRING, ['length' => 4, 'notnull' => true]);

        $tableIslandBuild->setPrimaryKey(['id']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('user');
        $schema->dropTable('island');
        $schema->dropTable('lobby_place');
        $schema->dropTable('game_map');
        $schema->dropTable('island_build');
    }
}
