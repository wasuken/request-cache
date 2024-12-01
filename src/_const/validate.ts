export function queryResultValidate(ipage: number, ilimit: number, totalPage: number) {
  let msgs = [];
  if (ipage > totalPage || ipage < 0) {
    if (ipage > totalPage) {
      msgs.push(
        `invalid parameters: page(${ipage + 1}) > totalPage(${totalPage}).`,
      );
    } else {
      msgs.push(`invalid parameters: page(${ipage + 1}) < 1.`);
    }
    return NextResponse.json(
      {
        errorMessage: msg,
      },
      { status: 400 },
    );
  }
  if (ilimit < 1 || ilimit > 10) {
    let msg = "";
    if (ilimit < 1) {
      msgs.push(
        `invalid parameters: invalid parameters: limit(${ilimit}) < 1.`,
      );
    } else {
      msgs.push(
        `invalid parameters: invalid parameters: limit(${ilimit}) > 10.`,
      );
    }
  }
  return {
    isValid: msgs.length > 0,
    msgs,
  };
}

