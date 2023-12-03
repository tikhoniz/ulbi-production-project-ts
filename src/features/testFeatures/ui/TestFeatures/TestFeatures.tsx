import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './TestFeatures.module.scss';
import { memo } from 'react';

interface TestFeaturesProps {
    className?: string;
}

export const TestFeatures = memo((props: TestFeaturesProps) => {
    const { className } = props;
    const { t } = useTranslation();
    
    return (
        <div className={classNames(cls.TestFeatures, {}, [className])}>
           
        </div>
    );
});