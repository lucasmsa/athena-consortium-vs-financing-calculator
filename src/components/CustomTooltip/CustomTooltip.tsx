import { itemNameMatcher } from "@/utils/itemNameMatcher";
import { TooltipProps } from "recharts";

export const CustomTooltip = ({ payload }: TooltipProps<number, string>) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="bg-white p-2 rounded">
      {payload.map((item, index) => {
        if (
          item &&
          item.value !== undefined &&
          (item.name as keyof typeof itemNameMatcher)
        ) {
          const nameKey = item.name as keyof typeof itemNameMatcher;
          return (
            <p key={index}>{`${
              itemNameMatcher[nameKey]
            }: R$ ${item.value?.toFixed(2)}`}</p>
          );
        }
        return null;
      })}
    </div>
  );
};
