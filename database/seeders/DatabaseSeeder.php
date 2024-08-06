<?php

namespace Database\Seeders;

use App\Models\Server;
use App\Models\User;
use Faker\Factory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $faker = Factory::create();

        for ($i = 0; $i < 70; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => bcrypt('password')
            ]);
        }

        for ($i = 0; $i < 5; $i++) {
            Server::create([
                'name' => $faker->name,
                'invite_code' => $faker->uuid(),
                'image' => "https://tse4.mm.bing.net/th?id=OIP.g3H28e_eHsjdaUxitNLtpgHaEo&pid=Api&P=0&h=220",
                'user_id' => User::all()->random()->id
            ]);
        }

        for ($i = 0; $i < 5; $i++) {

            $user = User::all()->random();
            $server = Server::all()->random();
            $user->servers()->attach($server->id, ['member_role' => 'ADMIN']);
        }

        for ($i = 0; $i < 10; $i++) {

            $user = User::all()->random();
            $server = Server::all()->random();
            $user->servers()->attach($server->id, ['member_role' => 'MODERATOR']);
        }
        for ($i = 0; $i < 50; $i++) {

            $user = User::all()->random();
            $server = Server::all()->random();
            $user->servers()->attach($server->id, ['member_role' => 'GUEST']);
        }
    }
}
