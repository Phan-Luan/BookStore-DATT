<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $user;
    protected $role;
    public function __construct(User $user, Role $role)
    {
        $this->user = $user;
        $this->role = $role;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $users = $this->user->latest('id')->where('name', 'like', '%' . $search . '%')->paginate(5);
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = $this->role->all()->groupBy('group');
        return response()->json($roles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $user = $this->user->create($data);
        $user->roles()->attach($data['role_ids']);
        return response()->json($user);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = $this->user->findOrFail($id)->load('roles');
        return response()->json( $user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $user = $this->user->findOrFail($id)->load('roles');
        return response()->json(
            $user,
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // $dataUpdate = $request->validate($request);
        $dataUpdate = $request->except('password');
        $user = $this->user->findOrFail($id)->load('roles');
        $user->update($dataUpdate);
        $user->roles()->sync($dataUpdate['role_ids'] ?? []);
        return response()->json($user);
    }
    public function destroy(string $id)
    {
        $user = $this->user->findOrFail($id)->load('roles');
        $user->delete();
        return response()->json($user);
    }
}
