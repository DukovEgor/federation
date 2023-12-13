import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Result, message } from 'antd';
import { memo, useCallback, useState } from 'react';

import useLogin from '@/hooks/useLogin';

import { AutorizationData } from '@/types/authorization';

import styles from './unauthorized.module.scss';

function Unauthorized() {
	const [checked, setChecked] = useState(false);

	const { login, isLoading } = useLogin();

	const handleLogin = useCallback(
		async (data: AutorizationData) => {
			try {
				await login(data);
			} catch (error) {
				message.warning(error as string);
			}
		},
		[login],
	);
	return (
		<Form
			name="form_in_modal"
			className={styles.loginform}
			initialValues={{ remember: true }}
			onFinish={handleLogin}
		>
			<Result status={403} />
			<Form.Item
				name="username"
				rules={[{ required: true, message: 'Пожалуйста, введите логин' }]}
				hasFeedback
			>
				<Input
					size="large"
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="Логин"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
				hasFeedback
			>
				<Input.Password
					size="large"
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Пароль"
				/>
			</Form.Item>
			<div className="flex flex__dashed--center form__buttons__container">
				<Form.Item name="remember">
					<Checkbox
						checked={checked}
						onChange={(evt) => setChecked(evt.target.checked)}
					>
						Запомнить меня
					</Checkbox>
				</Form.Item>
			</div>
			<div className={styles.buttons}>
				<Button
					size="large"
					type="primary"
					htmlType="submit"
					className="login-form-button"
					loading={isLoading}
				>
					Войти
				</Button>
				<Button size="large" htmlType="reset" className="login-form-button">
					Отмена
				</Button>
			</div>
		</Form>
	);
}

export default memo(Unauthorized);
