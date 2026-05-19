import styled from "styled-components";
import Card from "../components/UI/Card";
import { useNotification, NotificationFilter } from "../components/UI/Toast";

const notificationOptions: { value: NotificationFilter; label: string; description: string }[] = [
  {
    value: "all",
    label: "Все",
    description: "Показывать все уведомления, включая успехи, ошибки и информацию.",
  },
  {
    value: "errors",
    label: "Только ошибки",
    description: "Показывать только уведомления об ошибках.",
  },
  {
    value: "errors-info",
    label: "Ошибки и информация",
    description: "Показывать ошибки и информационные уведомления, скрывая успехи.",
  },
];

const SettingsPage = () => {
  const { filter, setNotificationFilter } = useNotification();

  return (
    <SettingsPageWrapper>
      <Card>
        <PageTitle>Настройки</PageTitle>
        <Section>
          <SectionHeader>Уведомления</SectionHeader>
          <Description>Выберите, какие уведомления вы хотите видеть в приложении.</Description>
          <RadioGroup>
            {notificationOptions.map((option) => (
              <RadioItem key={option.value}>
                <label>
                  <input
                    type="radio"
                    name="notification-filter"
                    value={option.value}
                    checked={filter === option.value}
                    onChange={() => setNotificationFilter(option.value)}
                  />
                  <OptionLabel>{option.label}</OptionLabel>
                </label>
                <OptionDescription>{option.description}</OptionDescription>
              </RadioItem>
            ))}
          </RadioGroup>
        </Section>
      </Card>
    </SettingsPageWrapper>
  );
};

const SettingsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  text-align: left;
`;

const PageTitle = styled.h1`
  margin-bottom: 18px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionHeader = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0;
`;

const Description = styled.p`
  color: var(--text-muted);
  margin: 0;
  line-height: 1.6;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RadioItem = styled.div`
  padding: 16px;
  border-radius: 18px;
  background: var(--surface-soft);
  border: 1px solid var(--border);
`;

const OptionLabel = styled.span`
  margin-left: 10px;
  font-weight: 600;
`;

const OptionDescription = styled.p`
  margin: 8px 0 0 28px;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
`;

export default SettingsPage;
