import React, { useEffect, useState } from 'react';
import { ISubscription, useObserverValue } from 'react-observing';

import { IItem, PropertiesEditor } from '../../../shared/components/external';
import { FlowItemComponent, TreeItemComponent } from '../../../shared/models';
import { CurrentFocusStore } from '../../../shared/stores';
import { useEditorContext } from '../../../shared/hooks';
import { EComponentType, ECurrentFocus } from '../../../shared/enuns';

const useTreeSelectedItem = (): IItem | undefined => {
    const [selectedTreeItem, setSelectedTreeItem] = useState<TreeItemComponent<EComponentType>>();

    const { tabs } = useEditorContext();

    useEffect(() => {
        const subscriptions: (ISubscription & { itemId: string | undefined })[] = [];

        tabs.forEach(tab => {
            tab.items.value.forEach(treeItem => {
                if (treeItem.isSelected.value) {
                    setSelectedTreeItem(treeItem);
                }

                if (!subscriptions.some(subs => subs.itemId === treeItem.id.value)) {
                    subscriptions.push({
                        itemId: treeItem.id.value,
                        ...treeItem.isSelected.subscribe(isSelected => {
                            if (isSelected) {
                                setSelectedTreeItem(treeItem);
                            } else if (selectedTreeItem?.id.value === treeItem.id.value) {
                                setSelectedTreeItem(undefined);
                            }
                        }),
                    })
                }
            });

            subscriptions.push({
                itemId: tab.items.id,
                ...tab.items.subscribe(treeItems => {
                    treeItems.forEach(treeItem => {
                        if (treeItem.isSelected.value) {
                            setSelectedTreeItem(treeItem);
                        }

                        if (!subscriptions.some(subs => subs.itemId === treeItem.id.value)) {
                            subscriptions.push({
                                itemId: treeItem.id.value,
                                ...treeItem.isSelected.subscribe(isSelected => {
                                    if (isSelected) {
                                        setSelectedTreeItem(treeItem);
                                    } else if (selectedTreeItem?.id.value === treeItem.id.value) {
                                        setSelectedTreeItem(undefined);
                                    }
                                }),
                            })
                        }
                    });
                })
            });
        });

        return () => subscriptions.forEach(subs => subs?.unsubscribe());
    }, [selectedTreeItem, tabs]);


    if (!selectedTreeItem) return undefined;

    return {
        id: selectedTreeItem.id,
        name: selectedTreeItem.label,
        subname: selectedTreeItem.type,
        properties: selectedTreeItem.properties,
    };
}

const useFlowSelectedItem = (): IItem | undefined => {
    const [selectedFlowItem, setSelectedFlowItem] = useState<FlowItemComponent>();

    const { tabs } = useEditorContext();

    useEffect(() => {
        const subscriptions: (ISubscription & { itemId: string | undefined })[] = [];

        tabs.forEach(tab => {
            tab.items.value.forEach(treeItem => {
                if (treeItem.isEditing.value) {
                    treeItem.items.value.forEach(flowItem => {
                        if (flowItem.isSelected.value) {
                            setSelectedFlowItem(flowItem);
                        }

                        if (!subscriptions.some(subs => subs.itemId === flowItem.isSelected.id)) {
                            subscriptions.push({
                                itemId: flowItem.isSelected.id,
                                ...flowItem.isSelected.subscribe(isSelected => {
                                    if (isSelected) {
                                        setSelectedFlowItem(flowItem);
                                    } else if (selectedFlowItem?.id.value === flowItem.id.value) {
                                        setSelectedFlowItem(undefined);
                                    }
                                })
                            });
                        }
                    });

                    subscriptions.push({
                        itemId: treeItem.items.id,
                        ...treeItem.items.subscribe(items => {
                            items.forEach(flowItem => {
                                if (flowItem.isSelected.value) {
                                    setSelectedFlowItem(flowItem);
                                }

                                if (!subscriptions.some(subs => subs.itemId === flowItem.isSelected.id)) {
                                    subscriptions.push({
                                        itemId: flowItem.isSelected.id,
                                        ...flowItem.isSelected.subscribe(isSelected => {
                                            if (isSelected) {
                                                setSelectedFlowItem(flowItem);
                                            } else if (selectedFlowItem?.id.value === flowItem.id.value) {
                                                setSelectedFlowItem(undefined);
                                            }
                                        })
                                    });
                                }
                            });
                        }),
                    });
                }

                if (!subscriptions.some(subs => subs.itemId === treeItem.id.value)) {
                    subscriptions.push({
                        itemId: treeItem.id.value,
                        ...treeItem.isEditing.subscribe(isEditing => {
                            if (isEditing) {
                                treeItem.items.value.forEach(flowItem => {
                                    if (flowItem.isSelected.value) {
                                        setSelectedFlowItem(flowItem);
                                    }

                                    if (!subscriptions.some(subs => subs.itemId === flowItem.isSelected.id)) {
                                        subscriptions.push({
                                            itemId: flowItem.isSelected.id,
                                            ...flowItem.isSelected.subscribe(isSelected => {
                                                if (isSelected) {
                                                    setSelectedFlowItem(flowItem);
                                                } else if (selectedFlowItem?.id.value === flowItem.id.value) {
                                                    setSelectedFlowItem(undefined);
                                                }
                                            })
                                        });
                                    }
                                });

                                subscriptions.push({
                                    itemId: treeItem.items.id,
                                    ...treeItem.items.subscribe(items => {
                                        items.forEach(flowItem => {
                                            if (flowItem.isSelected.value) {
                                                setSelectedFlowItem(flowItem);
                                            }

                                            if (!subscriptions.some(subs => subs.itemId === flowItem.isSelected.id)) {
                                                subscriptions.push({
                                                    itemId: flowItem.isSelected.id,
                                                    ...flowItem.isSelected.subscribe(isSelected => {
                                                        if (isSelected) {
                                                            setSelectedFlowItem(flowItem);
                                                        } else if (selectedFlowItem?.id.value === flowItem.id.value) {
                                                            setSelectedFlowItem(undefined);
                                                        }
                                                    })
                                                });
                                            }
                                        });
                                    }),
                                });
                            } else if (selectedFlowItem?.id.value === treeItem.id.value) {
                                setSelectedFlowItem(undefined);
                            }
                        }),
                    })
                }
            });

            subscriptions.push({
                itemId: tab.items.id,
                ...tab.items.subscribe(items => {
                    items.forEach(treeItem => {
                        if (treeItem.isEditing.value) {
                            treeItem.items.value.forEach(flowItem => {
                                if (flowItem.isSelected.value) {
                                    setSelectedFlowItem(flowItem);
                                }

                                if (!subscriptions.some(subs => subs.itemId === flowItem.isSelected.id)) {
                                    subscriptions.push({
                                        itemId: flowItem.isSelected.id,
                                        ...flowItem.isSelected.subscribe(isSelected => {
                                            if (isSelected) {
                                                setSelectedFlowItem(flowItem);
                                            }
                                        })
                                    });
                                }
                            });

                            subscriptions.push({
                                itemId: treeItem.items.id,
                                ...treeItem.items.subscribe(items => {
                                    items.forEach(flowItem => {
                                        if (flowItem.isSelected.value) {
                                            setSelectedFlowItem(flowItem);
                                        }

                                        if (!subscriptions.some(subs => subs.itemId === flowItem.isSelected.id)) {
                                            subscriptions.push({
                                                itemId: flowItem.isSelected.id,
                                                ...flowItem.isSelected.subscribe(isSelected => {
                                                    if (isSelected) {
                                                        setSelectedFlowItem(flowItem);
                                                    } else if (selectedFlowItem?.id.value === flowItem.id.value) {
                                                        setSelectedFlowItem(undefined);
                                                    }
                                                })
                                            });
                                        }
                                    });
                                }),
                            });
                        }

                        if (!subscriptions.some(subs => subs.itemId === treeItem.id.value)) {
                            subscriptions.push({
                                itemId: treeItem.id.value,
                                ...treeItem.isEditing.subscribe(isEditing => {
                                    if (isEditing) {
                                        treeItem.items.value.forEach(flowItem => {
                                            if (flowItem.isSelected.value) {
                                                setSelectedFlowItem(flowItem);
                                            }

                                            if (!subscriptions.some(subs => subs.itemId === flowItem.isSelected.id)) {
                                                subscriptions.push({
                                                    itemId: flowItem.isSelected.id,
                                                    ...flowItem.isSelected.subscribe(isSelected => {
                                                        if (isSelected) {
                                                            setSelectedFlowItem(flowItem);
                                                        }
                                                    })
                                                });
                                            }
                                        });
                                    } else if (selectedFlowItem?.id.value === treeItem.id.value) {
                                        setSelectedFlowItem(undefined);
                                    }
                                }),
                            })
                        }
                    });
                }),
            });
        });

        return () => subscriptions.forEach(subs => subs?.unsubscribe());
    }, [selectedFlowItem, tabs]);

    if (!selectedFlowItem) return undefined;

    return {
        id: selectedFlowItem.id,
        name: selectedFlowItem.label,
        subname: selectedFlowItem.type,
        properties: selectedFlowItem.properties,
    };
}

export const PropertiesEditorController: React.FC = () => {
    const selectedFlowItemProperties = useFlowSelectedItem();
    const selectedTreeItemProperties = useTreeSelectedItem();
    const currentFocus = useObserverValue(CurrentFocusStore);

    if (selectedTreeItemProperties && currentFocus === ECurrentFocus.tree) {
        return (
            <PropertiesEditor item={selectedTreeItemProperties} />
        );
    }

    if (selectedFlowItemProperties && currentFocus === ECurrentFocus.flow) {
        return (
            <PropertiesEditor item={selectedFlowItemProperties} />
        );
    } else {
        return null
    }
}
