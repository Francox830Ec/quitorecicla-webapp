import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
    ScreenSizeType,
    BreakpointType,
    DeviceType,
    OrientationType,
} from './responsive.enum';

@Injectable({
    providedIn: 'root',
})
export class ResponsiveService {
    private _screenSize = ScreenSizeType.Unknown;
    private _screenHeightCalculated : any;

    constructor(breakpointObserver: BreakpointObserver) {
        this.checkScreenSize(breakpointObserver);
        this.checkDeviceTypeAndOrientation(breakpointObserver);
    }

    public setElementToScreenHeightCalculated(element: HTMLElement){
      this._screenHeightCalculated = element;
    }

    public getMaxHeightByPercentageOfElement(percetange: number){
        return Math.round(this.getScreenHeightCalculated() * percetange);
    }

    public getScreenHeightCalculated(){
        if(this._screenHeightCalculated != undefined){
            return this._screenHeightCalculated;
        }else{
            return window.innerHeight;
        }
    }

    public getHeightCalculatedOfElement(element: HTMLElement, percetange: number){
        let elementOffsetHeight = element.offsetHeight;

        if(elementOffsetHeight < 100 || elementOffsetHeight > window.innerHeight){
            // console.warn("--> window.innerHeight: ", window.innerHeight)
            this._screenHeightCalculated = window.innerHeight;
            return Math.round((this._screenHeightCalculated * percetange) - 8);
        }else{
            this._screenHeightCalculated = elementOffsetHeight;
            // console.warn("--> elementOffsetHeight (div cardScreenHeigth): ", elementOffsetHeight)
            return Math.round(this._screenHeightCalculated * percetange);
        }
    }

    public get screenSize(): ScreenSizeType {
        return this._screenSize;
    }

    private readonly screenSizeBreakpoints = new Map([
        [Breakpoints.XSmall, ScreenSizeType.XSmall],
        [Breakpoints.Small, ScreenSizeType.Small],
        [Breakpoints.Medium, ScreenSizeType.Medium],
        [Breakpoints.Large, ScreenSizeType.Large],
        [Breakpoints.XLarge, ScreenSizeType.XLarge],
    ]);

    private checkScreenSize(breakpointObserver: BreakpointObserver): void {
        breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .subscribe((result:any) => {
                for (const query of Object.keys(result.breakpoints)) {
                    if (result.breakpoints[query]) {
                        this._screenSize =
                            this.screenSizeBreakpoints.get(query) ??
                            ScreenSizeType.Unknown;
                    }
                }
            });
    }

    public orientationPortrait(): boolean {
        return this._orientation === OrientationType.Portrait;
    }
    public orientationLandscape(): boolean {
        return this._orientation === OrientationType.Landscape;
    }

    public deviceDesktop(): boolean {
        return this._deviceType === DeviceType.Web;
    }
    public deviceTablet(): boolean {
        return this._deviceType === DeviceType.Tablet;
    }
    public deviceMobile(): boolean {
        return this._deviceType === DeviceType.Handset;
    }

    private _deviceType = DeviceType.Unknown;
    public get deviceType(): DeviceType {
        return this._deviceType;
    }

    private _orientation = OrientationType.Unknown;
    public get orientation(): OrientationType {
        return this._orientation;
    }

    private readonly deviceAndOrientation = new Map([
        [Breakpoints.HandsetLandscape, BreakpointType.HandsetLandscape],
        [Breakpoints.HandsetPortrait, BreakpointType.HandsetPortrait],
        [Breakpoints.TabletLandscape, BreakpointType.TabletLandscape],
        [Breakpoints.TabletPortrait, BreakpointType.TabletPortrait],
        [Breakpoints.WebLandscape, BreakpointType.WebLandscape],
        [Breakpoints.WebPortrait, BreakpointType.WebPortrait],
    ]);

    private checkDeviceTypeAndOrientation(breakpointObserver: BreakpointObserver): void {
        breakpointObserver
            .observe([
                Breakpoints.HandsetLandscape,Breakpoints.HandsetPortrait,
                Breakpoints.WebLandscape,Breakpoints.WebPortrait,
                Breakpoints.TabletLandscape,Breakpoints.TabletPortrait,
            ])
            .subscribe((result:any) => {
                let orientationTypes = Object.keys(OrientationType).map((key) => key);

                let deviceTypes = Object.keys(DeviceType).map((key) => key);

                for (const query of Object.keys(result.breakpoints)) {
                    if (result.breakpoints[query]) {
                        let type = this.deviceAndOrientation.get(query) ?? BreakpointType.Unknown;

                        orientationTypes.forEach((element) => {
                            if (type.indexOf(element) !== -1)
                                this._orientation = element as OrientationType;
                        });

                        deviceTypes.forEach((element) => {
                            if (type.indexOf(element) !== -1)
                                this._deviceType = element as DeviceType;
                        });
                    }
                }
            });
    }
}
