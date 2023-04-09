export * from './types.monitor'

export type TypeFromObjectPropertyPath<
    ObjectType extends Record<string | number, any>,
    ObjectPropertyPath extends string
> = {
    [Key in ObjectPropertyPath]: Key extends keyof ObjectType
        ? ObjectType[Key]
        : Key extends `${infer P}.${infer S}`
        ? ObjectType[P] extends Record<string | number, any>
            ? // @ts-ignore
              TypeFromObjectPropertyPath<ObjectType[P], S>
            : never
        : never
}[ObjectPropertyPath]

declare global {
    interface Window {
        monitor: {
            connect: any
            disconnect: any
            refreshPorts: any
            refreshBaudRates: any
            onPorts: any
            onBaudRates: any
            onError: any
            onOpen: any
            onClose: any
            onData: any
        }
        app: {
            minimize: any
            maximize: any
            close: any
        }
    }
}
