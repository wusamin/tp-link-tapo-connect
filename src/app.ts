import { cloudLogin, listDevicesByType, loginDevice, setColortemp, turnOff, turnOn } from "./api"
import { TapoDevice } from "./types";

type Command = "temp" | "off" | "on"

/**
 * tapoに登録しているすべての電球の色温度を変更する
 * 
 * @param colorTemp 
 * @param transition 
 */
const changeColortemp = async (colorTemp: number, transition: number) => {
    const devices = await getLightbulbDevices("tatsusamimi@gmail.com", "Imoko222");
    devices.forEach(async (v) => {
        const token = await loginDevice("tatsusamimi@gmail.com", "Imoko222", v);
        await setColortemp(token, { colorTemp, transition });
    });
}

const getLightbulbDevices = async (ID: string, password: string): Promise<TapoDevice[]> => {
    const cloudToken = await cloudLogin(ID, password);
    return listDevicesByType(cloudToken, 'SMART.TAPOBULB');
}

const lightOff = async (transition: number) => {
    const devices = await getLightbulbDevices("tatsusamimi@gmail.com", "Imoko222");
    devices.forEach(async (v) => {
        const token = await loginDevice("tatsusamimi@gmail.com", "Imoko222", v);
        await turnOff(token, transition)
    });
}

const lightOn = async (transition: number) => {
    const devices = await getLightbulbDevices("tatsusamimi@gmail.com", "Imoko222");
    console.log(devices);
    devices.forEach(async (v) => {
        const token = await loginDevice("tatsusamimi@gmail.com", "Imoko222", v);
        await turnOn(token, { deviceOn: true, transition })
    });
}

const main = async () => {
    switch (process.argv[2]) {
        case "temp":
            await changeColortemp(Number(process.argv[3]), Number(process.argv[4]));
        case "off":
            await lightOff(Number(process.argv[3]));
        case "on":
            await lightOn(Number(process.argv[3]));
    }
}

main()
