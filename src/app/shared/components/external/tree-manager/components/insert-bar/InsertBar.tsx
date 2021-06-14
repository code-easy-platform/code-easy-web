import { memo } from "react";

interface InsertBarProps {
  marginLeft?: number;
  background?: string;
  visible: boolean;
}
export const InsertBar: React.FC<InsertBarProps> = memo(({ visible, marginLeft = 0, background = 'green' }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        backgroundColor: background,
        pointerEvents: 'none',
        marginBottom: -2,
        borderRadius: 2,
        marginTop: -2,
        zIndex: 100,
        marginLeft,
        padding: 2,
        height: 0,
      }}
    />
  );
});
