import { EditableProfileCard } from 'features/editableProfileCard'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { VerticalStack } from 'shared/ui/Stack/VerticalStack/VerticalStack'
import { Page } from 'widgets/Page/Page'
import { Text } from 'shared/ui/Text/Text'

interface ProfilePageProps {
  className?: string
  id?: string
}

const ProfilePage = ({ className }: ProfilePageProps): JSX.Element => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <Text text='Профиль не найден' />
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <VerticalStack gap={'16'} fullWidth>
        <EditableProfileCard id={id} />
      </VerticalStack>
    </Page>
  )
}

export default ProfilePage
