import { NavLink } from "react-router-dom"
import icons from '../../util/icon';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions';
import { useNavigate } from "react-router-dom";
const {FcGoogle, FaFacebook} = icons;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message, loginError, currentUser, isLoggingIn } = useSelector(state => state.app);
    const { accessToken } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        account: "",
        password: ""
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoggingIn) return;
        dispatch(actions.login(formData))
    }
    
    useEffect(() => {
        if(message === "Login successful" && currentUser?._id && accessToken){
            navigate("/");
        }
    }, [message, navigate, currentUser, accessToken])
    
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <div className="relative min-h-screen w-full overflow-hidden">
                <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />

                <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-3">
                        <NavLink to={"/"} className="inline-flex items-center gap-3">
                            <img src="/img/default/logo.png" alt="Viet Phat Elevator" className="h-14 w-auto" />
                        </NavLink>
                        <div className="hidden sm:block">
                            <div className="text-sm text-slate-600">Trang quản trị</div>
                            <h1 className="text-xl font-semibold text-emerald-800">Đăng nhập</h1>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="text-sm font-medium text-emerald-700 underline-offset-4 hover:text-emerald-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2"
                        onClick={() => {}}
                    >
                        Bạn cần giúp đỡ?
                    </button>
                </header>

                <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 pb-10">
                    <div className="grid w-full items-center gap-10 lg:grid-cols-2">
                        <section className="hidden lg:block">
                            <div className="max-w-lg">
                                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                                    Đăng nhập nhanh, thao tác gọn gàng.
                                </h2>
                                <p className="mt-3 text-base leading-7 text-slate-600">
                                    Giao diện tối giản giúp bạn tập trung vào công việc: quản lý đơn hàng, sản phẩm, bài viết và cấu hình hệ thống.
                                </p>
                                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-slate-700 ring-1 ring-slate-200 backdrop-blur">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Bảo mật phiên đăng nhập
                                </div>
                            </div>
                        </section>

                        <section className="flex w-full justify-center lg:justify-end">
                            <form
                                className="w-full max-w-md rounded-2xl bg-white/80 p-6 shadow-[0_12px_40px_-18px_rgba(2,44,34,0.35)] ring-1 ring-slate-200 backdrop-blur"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <h2 className="text-center text-2xl font-semibold text-slate-900">Chào mừng bạn</h2>
                                    <p className="mt-1 text-center text-sm text-slate-600">
                                        Đăng nhập để tiếp tục vào hệ thống.
                                    </p>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <label className="block">
                                        <span className="mb-1 block text-sm font-medium text-slate-700">Tài khoản</span>
                                        <input
                                            type="text"
                                            placeholder="Nhập tài khoản của bạn"
                                            name="account"
                                            autoComplete="username"
                                            required
                                            onChange={handleChange}
                                            disabled={isLoggingIn}
                                            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-200/40"
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="mb-1 block text-sm font-medium text-slate-700">Mật khẩu</span>
                                        <input
                                            type="password"
                                            placeholder="Nhập mật khẩu"
                                            name="password"
                                            autoComplete="current-password"
                                            required
                                            onChange={handleChange}
                                            disabled={isLoggingIn}
                                            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-200/40"
                                        />
                                    </label>

                                    {loginError ? (
                                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                            {loginError}
                                        </div>
                                    ) : null}

                                    <button
                                        type="submit"
                                        disabled={isLoggingIn}
                                        className="group relative inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/50 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isLoggingIn ? (
                                            <>
                                                <span
                                                    aria-hidden="true"
                                                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                                                />
                                                Đang đăng nhập...
                                            </>
                                        ) : (
                                            "Đăng nhập"
                                        )}
                                    </button>

                                    <div className="flex items-center justify-between">
                                        <button
                                            type="button"
                                            disabled={isLoggingIn}
                                            className="text-sm font-medium text-emerald-700 underline-offset-4 hover:text-emerald-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2"
                                            onClick={() => {}}
                                        >
                                            Quên mật khẩu?
                                        </button>
                                        <NavLink
                                            to={"/"}
                                            className="text-sm font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 focus-visible:ring-offset-2"
                                        >
                                            Về trang chủ
                                        </NavLink>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px w-full bg-slate-200" />
                                        <div className="text-xs font-medium uppercase tracking-wider text-slate-400">hoặc</div>
                                        <div className="h-px w-full bg-slate-200" />
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            disabled={isLoggingIn}
                                            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
                                        >
                                            <FaFacebook className="text-xl text-blue-600" />
                                            Facebook
                                        </button>
                                        <button
                                            type="button"
                                            disabled={isLoggingIn}
                                            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
                                        >
                                            <FcGoogle className="text-xl" />
                                            Google
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default Login