<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240626132301 extends AbstractMigration
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

        $tableIsland->setPrimaryKey(['island_id']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('user');
    }
}
