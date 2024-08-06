<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory;

class MessageTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $faker = Factory::create();

        for ($i = 0; $i < 750; $i++) {
            $random_number = $faker->numberBetween(3, 6);
            Message::create([
                'user_id' => User::all()->random()->id,
                'channel_id' => Channel::all()->random()->id,
                'content' => $faker->sentence($random_number)
            ]);
        }
    }
}
