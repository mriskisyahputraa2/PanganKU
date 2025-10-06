import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, UserPlus } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout 
            title={
                <div className="text-center">
                    {/* Icon + Title */}
                    <UserPlus className="mx-auto mb-2 h-10 w-10 text-[#B4A77E]" />
                    <h1 className="text-2xl font-bold text-gray-800">Buat Akun Baru</h1>
                    {/* Garis dekoratif */}
                    <div className="mt-2 w-16 h-1 mx-auto bg-[#B4A77E] rounded-full"></div>
                </div>
            }
            description="Masukkan data Anda di bawah ini untuk membuat akun"
        >
            <Head title="Daftar" />

            <div className="flex justify-center items-center">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <Form
                        {...RegisteredUserController.store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    {/* Nama Lengkap */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-gray-700 font-medium">Nama Lengkap</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="Nama lengkap kamu"
                                            className="bg-[ivory] text-gray-900 rounded-xl border border-[#B4A77E]"
                                        />
                                        <InputError message={errors.name} className="mt-1 text-sm text-red-500" />
                                    </div>

                                    {/* Email */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-gray-700 font-medium">Alamat Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="email@contoh.com"
                                            className="bg-[ivory] text-gray-900 rounded-xl border border-[#B4A77E]"
                                        />
                                        <InputError message={errors.email} className="mt-1 text-sm text-red-500" />
                                    </div>

                                    {/* Kata Sandi */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="password" className="text-gray-700 font-medium">Kata Sandi</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="Masukkan kata sandi"
                                            className="bg-[ivory] text-gray-900 rounded-xl border border-[#B4A77E]"
                                        />
                                        <InputError message={errors.password} className="mt-1 text-sm text-red-500" />
                                    </div>

                                    {/* Konfirmasi Kata Sandi */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation" className="text-gray-700 font-medium">Konfirmasi Kata Sandi</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="Ulangi kata sandi"
                                            className="bg-[ivory] text-gray-900 rounded-xl border border-[#B4A77E]"
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-1 text-sm text-red-500" />
                                    </div>

                                    {/* Tombol Daftar */}
                                    <Button 
                                        type="submit" 
                                        className="mt-2 w-full bg-[#B4A77E] text-white font-semibold rounded-xl py-2 hover:bg-[#9c946d] transition duration-200" 
                                        tabIndex={5} 
                                        data-test="register-user-button"
                                    >
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                        Daftar
                                    </Button>
                                </div>

                                {/* Sudah punya akun */}
                                <div className="text-center text-sm text-gray-600 mt-4">
                                    Sudah punya akun?{' '}
                                    <TextLink href={login()} tabIndex={6} className="text-[#B4A77E] font-semibold hover:underline">
                                        Masuk
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </AuthLayout>
    );
}
