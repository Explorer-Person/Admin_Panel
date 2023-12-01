export const onErrorLogic = (error: unknown, errorInfo: unknown)=>{
    console.log(error);
    console.log(errorInfo);
  }
export const onResetLogic = ()=> {
    console.log("Reloading the page...");
    setTimeout(()=>{
      window.location.reload();
    },2000);
  }