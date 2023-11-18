<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $tokenTimestamp = now()->addMinutes(30)->timestamp * 1000;

        return [
            'user_id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'image' => $this->image,
            'token' => $this->createToken("Token")->plainTextToken,
            'roles' => $this->roles->pluck('name') ?? [],
            'roles.permissions' => $this->getPermissionsViaRoles()->pluck('name') ?? [],
            'token_timestamp' => $tokenTimestamp, // Thêm timestamp của token
        ];
    }
}
