import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput, Password, Box, Checkbox, FormControlLabel, Stack } from '../../common/mui';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { useTranslation } from "react-i18next";
import { loginUser } from '../../../store/actions/userAction';
import styled from 'styled-components';
import { createDeviceId, getDeviceId } from '../../../utils/device';

// Styled Components
const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
`;

const Card = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 28px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 90%;
  max-width: 900px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 400px;
  }
`;

const ImageSection = styled.div`
  flex: 0.8;
  background: url('/images/login-backgrount.jpg') center/cover no-repeat;
  min-height: 400px;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const FormSection = styled.div`
  flex: 1.2;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    color: #1976d2;
    margin-bottom: 8px;
    font-size: 1.8rem;
    font-weight: 600;
  }

  p {
    color: #666;
    font-size: 0.95rem;
  }
`;

const SocialLogin = styled.div`
  text-align: center;
  margin-top: 24px;

  p {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 12px;
  }

  .social-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .social-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;

    &:hover {
      background-color: #e0e0e0;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  });

  const [isLoading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(loginUser(data))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => {
        console.log(err);
        Notification.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <LoginWrapper>
      <Card>
        {/* Left Side Image */}
        <ImageSection />

        {/* Right Side Form */}
        <FormSection>
          <div>
            <FormHeader>
              <h2>{t('common.login')}</h2>
              <p>Welcome back! Please enter your credentials.</p>
            </FormHeader>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={t('common.username')}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Password
                    {...field}
                    label={t('common.password')}
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />

              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={t('login.rememberMe')}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? t('common.loading') : t('common.login')}
              </Button>
            </Box>
          </div>

          {/* Social Login */}
          <SocialLogin>
            <p>Or sign in with</p>
            <div className="social-buttons">
              <button className="social-btn">
                <img src="/icons/google.svg" alt="Google" />
              </button>
              <button className="social-btn">
                <img src="/icons/facebook.svg" alt="Facebook" />
              </button>
              <button className="social-btn">
                <img src="/icons/github.svg" alt="GitHub" />
              </button>
            </div>
          </SocialLogin>
        </FormSection>
      </Card>
    </LoginWrapper>
  );
}

export { LoginForm };
