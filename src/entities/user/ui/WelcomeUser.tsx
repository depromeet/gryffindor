import { RoundButton } from "@/shared/ui";

interface WelcomeUserProps {
  userName: string;
}

export function WelcomeUser({ userName }: WelcomeUserProps) {
  return (
    <div className="flex items-start justify-between">
      <span className="text-gray900 text-title1">
        <strong className="text-primary400">{userName}</strong>님을 위한
        <br /> 식당만 선별했어요
      </span>
      <RoundButton iconName="speaker" label="식당제보" />
    </div>
  );
}
