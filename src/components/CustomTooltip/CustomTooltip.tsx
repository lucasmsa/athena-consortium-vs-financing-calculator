import { formatToCurrency } from "@/utils/formatToCurrency";
import { itemNameMatcher } from "@/utils/itemNameMatcher";
import { TooltipProps } from "recharts";

export const CustomTooltip = ({ payload }: TooltipProps<number, string>) => {
  if (!payload || payload.length === 0) return null;
  console.log({
    payload,
  });

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
            <div key={index}>
              {index === 0 && <p className="font-bold">{item.payload.month}</p>}
              <p>{`${itemNameMatcher[nameKey]}: ${formatToCurrency(
                item.value
              )}`}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
