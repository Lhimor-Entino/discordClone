import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler, useEffect } from "react";

type Props = {};

const Login = (props: Props) => {
    const { data, setData, processing, errors, reset, post } = useForm({
        email: "",
        password: "",
    });

    useEffect(() => {
        reset("password");
    }, []);

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };
    return (
        <>
            <Head title="Log In" />
            <div className="lg:p-8">
                <div className=" sm:w-[350px] mx-auto flex flex-col w-full justify-center gap-y-6">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h1 className=" text-2xl font-semibold tracking-tight">
                            Sign In
                        </h1>
                        <p>Enter you login Credentials</p>
                    </div>
                    <div className=" grid gap-6">
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-6 ">
                                <div className=" grid gap-1.5">
                                    <Label htmlFor="email"> Email </Label>
                                    <Input
                                        id="email"
                                        placeholder="Enter your Email"
                                        type="text"
                                        disabled={processing}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        value={data.email}
                                    />
                                    {errors.email && (
                                        <p className="text-destructive text-sm text-center">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className=" grid gap-1.5">
                                    <Label htmlFor="password"> Password </Label>
                                    <Input
                                        id="password"
                                        placeholder="Enter your password"
                                        type="password"
                                        disabled={processing}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        value={data.password}
                                    />
                                    {errors.password && (
                                        <p className="text-destructive text-sm text-center">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <Button disabled={processing}>
                                    {processing && (
                                        <Loader2 className="h-5 w-5  animate-spin-ml-2"></Loader2>
                                    )}
                                    Sign In
                                </Button>

                                <p className="px-0 text-center text-sm text-muted-foreground">
                                    {" "}
                                    Don't Have an Account?
                                    <Link
                                        href={route("register")}
                                        className="ml-2 underline underline-offset-4 hover:text-primary  transition duration-300"
                                    >
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
