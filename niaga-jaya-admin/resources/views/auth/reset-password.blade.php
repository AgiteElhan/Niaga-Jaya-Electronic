<x-guest-layout>
    <form method="POST" action="{{ route('password.store') }}">
        @csrf

        <!-- Password Reset Token -->
        <input type="hidden" name="token" value="{{ $request->route('token') }}">

        <!-- Email Address -->
        <div>
            <label> for="email" :value="__('Email')" />
            <input> id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email', $request->email)" required autofocus autocomplete="username" />
                            @error('email')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror        
        </div>

        <!-- Password -->
        <div class="mt-4">
            <label> for="password" :value="__('Password')" />
            <input> id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="new-password" />
            @error('password')
    <span class="text-danger small">{{ $message }}</span>
@enderror
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <label> for="password_confirmation" :value="__('Confirm Password')" />

            <input> id="password_confirmation" class="block mt-1 w-full"
                                type="password"
                                name="password_confirmation" required autocomplete="new-password" />

                            @error('password_confirmation')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror        </div>

        <div class="flex items-center justify-end mt-4">
            <button>>
                {{ __('Reset Password') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
