import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loginError, currentUser, accessToken, loginStatus } = useSelector(
        (state) => state.auth
    );
    const isLoggingIn = loginStatus === "loading";
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
        if (
            loginStatus === "succeeded" &&
            currentUser?._id &&
            accessToken
        ) {
            navigate("/");
        }
    }, [loginStatus, navigate, currentUser, accessToken]);
    
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-white via-[#eaf7ee] to-white">
            <div className="relative min-h-screen w-full overflow-hidden">
                <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#2f904b]/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-[#2f904b]/10 blur-3xl" />

                <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 py-10 sm:py-14">
                    <div className="grid w-full items-center gap-10 lg:grid-cols-2">
                        <section className="hidden lg:block">
                            <div className="max-w-lg">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/img/default/logo.png"
                                        alt="Viet Phat Elevator"
                                        className="h-12 w-auto"
                                    />
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900">Viet Phat Elevator</div>
                                        <div className="text-xs text-slate-600">Trang quản trị</div>
                                    </div>
                                </div>

                                <h2 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900">
                                    Đăng nhập nhanh, thao tác gọn gàng.
                                </h2>
                                <p className="mt-3 text-base leading-7 text-slate-600">
                                    Giao diện tối giản giúp bạn tập trung vào công việc: quản lý đơn hàng, sản phẩm, bài viết và cấu hình hệ thống.
                                </p>
                                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-slate-700 ring-1 ring-slate-200 backdrop-blur">
                                    <span className="h-2 w-2 rounded-full bg-[#2f904b]" />
                                    Bảo mật phiên đăng nhập
                                </div>
                            </div>
                        </section>

                        <section className="flex w-full justify-center lg:justify-end">
                            <form
                                className="w-full max-w-md rounded-2xl bg-white/85 p-6 shadow-[0_12px_40px_-18px_rgba(2,44,34,0.35)] ring-1 ring-slate-200 backdrop-blur"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <div className="flex flex-col items-center gap-2 text-center lg:hidden">
                                        <img
                                            src="/img/default/logo.png"
                                            alt="Viet Phat Elevator"
                                            className="h-14 w-auto"
                                        />
                                        <div className="text-sm font-semibold text-slate-900">Viet Phat Elevator</div>
                                        <div className="text-xs text-slate-600">Trang quản trị</div>
                                    </div>

                                    <h2 className="mt-4 text-center text-2xl font-semibold text-slate-900">Đăng nhập</h2>
                                    <p className="mt-1 text-center text-sm text-slate-600">
                                        Nhập tài khoản và mật khẩu để tiếp tục.
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
                                            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-[#2f904b]/40 focus:ring-4 focus:ring-[#2f904b]/15"
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
                                            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-[#2f904b]/40 focus:ring-4 focus:ring-[#2f904b]/15"
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
                                        className="group relative inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2f904b] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#25733b] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2f904b]/25 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70"
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