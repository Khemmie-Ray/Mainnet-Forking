




// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });


















// addLiquidity




// import {ethers} from "hardhat";

// const helpers = require("@nomicfoundation/hardhat-toolbox/network-helpers");


// async function main() {

//     const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
//     const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
//     const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

//     const UniSwapRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

//     const USDCHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";

//     //this is where the impersonation happens
//     await helpers.impersonateAccount(USDCHolder);
//     const impersonatedSigner = await ethers.getSigner(USDCHolder);

//     const USDC = await ethers.getContractAt("IERC20", USDCAddress);
//     const DAI = await ethers.getContractAt("IERC20", DAIAddress);
//     const WETH = await ethers.getContractAt("IERC20", WETHAddress);

//     const ROUTER = await ethers.getContractAt("IUniSwap", UniSwapRouter);


//     const USDCAmountOut = ethers.parseUnits("200000", 6);
//     const DAIAmountOut = ethers.parseUnits("20000000000000000000", 18);

//     const usdcTx =
//         await USDC.connect(impersonatedSigner).approve(UniSwapRouter, USDCAmountOut);
//     await usdcTx.wait();

//     const daiTx =
//         await DAI.connect(impersonatedSigner).approve(UniSwapRouter, DAIAmountOut);
//     await daiTx.wait();


//     console.log("USDC Balance:", ethers.formatUnits(
//         await USDC.balanceOf(impersonatedSigner.address), 6))
//     console.log("DAI Balance:", ethers.formatUnits(
//         await DAI.balanceOf(impersonatedSigner.address), 18));

//     const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

//     //THIS IS WHERE THE INTERACTION WITH MAIN NET IS HAPPENING
//     const addLiquidTx = await ROUTER.connect(impersonatedSigner).addLiquidity(
//         USDCAddress,
//         DAIAddress,
//         USDCAmountOut,
//         DAIAmountOut,
//         0,
//         0,
//         impersonatedSigner.address,
//         deadline
//     );
//     await addLiquidTx.wait();

//     console.log("-----------------------------------------------------------------")

//     console.log("USDC Balance After Swap", ethers.formatUnits(
//         await USDC.balanceOf(impersonatedSigner.address), 6));
//     console.log("DAI Balance After Swap", ethers.formatUnits(
//         await DAI.balanceOf(impersonatedSigner.address), 18));

// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });


import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

const main = async () => {
    const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const wethAdress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    const USDCHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
    await helpers.impersonateAccount(USDCHolder);
    const impersonatedSigner = await ethers.getSigner(USDCHolder);

    const USDC = await ethers.getContractAt("IERC20", USDCAddress);
    const DAI = await ethers.getContractAt("IERC20", DAIAddress);

    const ROUTER = await ethers.getContractAt("IUniswap", UNIRouter);

    const USDCAmountOut = ethers.parseUnits("20000000000000000000000", 18);

    const usdcTx = await DAI.connect(impersonatedSigner).approve(UNIRouter, USDCAmountOut);
    await usdcTx.wait();

    const ETHbal = ethers.formatUnits(await impersonatedSigner.provider.getBalance(USDCHolder), 18);
    const usdcbal = ethers.formatUnits(await DAI.balanceOf(impersonatedSigner.address), 18);
    console.log("ETH bal:", ETHbal);
    console.log("USDC bal:",  usdcbal);

    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    const liquidityETHTx = await ROUTER.connect(impersonatedSigner).addLiquidityETH(
            DAIAddress,
           USDCAmountOut,
            0,
            0,
            impersonatedSigner.address,
            deadline,
            {value: ethers.parseEther("20")}
    );
            
    await liquidityETHTx.wait();

    console.log("-----------------------------------------------------------------")

        console.log("ETH balance after adding liquidity", ETHbal);
        console.log("USDC Balance After  Adding Liquidity", usdcbal);
          
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
