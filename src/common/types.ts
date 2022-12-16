import { Typography } from '@mui/material'
import { FormEvent, ReactNode } from 'react'

export interface ChildrenProps {
  children?: ReactNode;
}

export type HTMLFormEvent = FormEvent<HTMLFormElement>;

export const T = Typography
