<x-guest-layout>
    <form method="POST" action="{{ route('register') }}">
        @csrf

        <!-- Name -->
        <div>
            <label> for="name" :value="__('Name')" />
            <input> id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
                @error('name')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <label> for="email" :value="__('Email')" />
            <input> id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autocomplete="username" />
            @error('email')
                <div class="text-danger">{{ $message }}</div>
            @enderror        
        </div>

        <!-- Password -->
        <div class="mt-4">
            <label> for="password" :value="__('Password')" />

            <input> id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="new-password" />

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
                            @enderror
        </div>

        <div class="flex items-center justify-end mt-4">
            <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('login') }}">
                {{ __('Already registered?') }}
            </a>

            <button> class="ms-4">
                {{ __('Register') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
