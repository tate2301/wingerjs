export const generateRandomString = (
  length: number,
  uppercase?: boolean
): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text.toUpperCase();
};

export const getGreeting = (name?: string): string => {
  const currentTime = new Date().getHours();
  if (!name) {
    name = "Stranger";
  }

  if (currentTime >= 0 && currentTime < 12) {
    return "Good morning, " + name + " 👋";
  } else if (currentTime >= 12 && currentTime < 18) {
    return "Good afternoon, " + name + " ☀️";
  } else {
    return "Good evening, " + name + " 🌃";
  }
};

export const returnCurrentTimeFormatted = () => {
  const seconds =
    new Date().getSeconds() > 9
      ? new Date().getSeconds()
      : `0${new Date().getSeconds()}`;
  const minutes =
    new Date().getMinutes() > 9
      ? new Date().getMinutes()
      : `0${new Date().getMinutes()}`;

  const hours =
    new Date().getHours() > 9
      ? new Date().getHours()
      : `0${new Date().getHours()}`;

  return `${hours}:${minutes}:${seconds}`;
};

export const getFormattedAmount = (amount, isCompact?: boolean) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
    notation: isCompact ? "compact" : "standard",
  }).format(amount);
};

export const sortDataIntoAtlassianTable = async (
  data: Array<any>,
  columns: any
) => {
  const head = {
    cells: [{}],
  };

  const rows: Array<{ cells: Array<unknown>; id?: string }> = [
    {
      cells: [],
    },
  ];

  head.cells.pop();
  rows.pop();

  await Object.keys(columns).map((key) => {
    const obj = columns[key];
    head.cells.push({
      key,
      shouldTruncate: columns.shouldTruncate,
      content: obj.name,
    });
  });

  await data.map(async (obj) => {
    const cells: Array<unknown> = [];
    await Object.keys(columns).map((key) => {
      cells.push({
        key,
        content: obj[key],
      });
    });

    rows.push({
      cells,
      id: obj.id,
    });
  });

  return {
    head,
    rows,
  };
};
