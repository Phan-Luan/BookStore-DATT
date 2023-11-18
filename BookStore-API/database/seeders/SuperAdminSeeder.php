<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = User::whereEmail('luanpv2003@gmail.com')->first();
        if (!$superAdmin) {
            $superAdmin = User::factory()->create(['email' => 'admin@gmail.com']);
        }
        $superAdmin->assignRole('super-admin');
    }
}
