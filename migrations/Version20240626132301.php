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
        $table = $schema->createTable('user');
    
        $table->addColumn('user_id', Types::INTEGER, ['autoincrement' => true]);
        $table->addColumn('user_name', Types::STRING, ['length' => 200, 'notnull' => true]);
        $table->addColumn('email', Types::STRING, ['length' => 200, 'notnull' => true]);
        $table->addColumn('password', Types::STRING, ['length' => 200, 'notnull' => false]);
    
        $table->setPrimaryKey(['user_id']);
        $table->addUniqueIndex(['email']); 
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('user');
    }
}
