import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  useAppDispatch,
  useAppSelector
} from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import {
  getAddNewCommentError,
  getAddNewCommentText
} from '../model/selectors/AddNewCommentSelectors'
import {
  addNewCommentActions,
  addNewCommentReducer
} from '../model/slices/addNewCommentSlice'
import cls from './AddNewComment.module.scss'

export interface AddNewCommentProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addNewComment: addNewCommentReducer
}

const AddNewComment = ({
  className,
  onSendComment
}: AddNewCommentProps): JSX.Element => {
  const { t } = useTranslation()
  // получаем данные из стейта
  const text = useAppSelector(getAddNewCommentText)
  const error = useAppSelector(getAddNewCommentError)
  const dispatch = useAppDispatch()

  // поскольку мы передаем функцию пропсом оборачиваем в useCallback
  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addNewCommentActions.setText(value))
    },
    [dispatch]
  )

  const onSendHandler = useCallback(() => {
    onSendComment(text ?? '')
    onCommentTextChange('') // очищает поле ввода после отправки комментария
  }, [onCommentTextChange, onSendComment, text])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddNewComment, {}, [className])}>
        <Input
          className={cls.input}
          placeholder={t('commentText')}
          value={text}
          onChange={onCommentTextChange}
        />
        <Button theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>
          {t('submit')}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
}

export default AddNewComment
