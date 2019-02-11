import * as React from "react";
import { connect } from "react-redux";
import { addMessage } from "../../redux/actions/actions";
import InputTextComponent from "../../components/inputText/inputText.component";
import ButtonComponent from "../../components/button/button.component";
import DropDownComponent from "../../components/dropdown/dropdown.component";
import RadioButtonComponent from "../../components/radiobutton/radiobutton.component";
import * as alertUtils from "../../components/alert/alert.utils";

const mapStateToProps = state => {
    return { messages: state.messages };
};

function mapDispatchToProps(dispatch) {
    return {
        addMessage: message => dispatch(addMessage(message))
    };
}

export interface SampleFeatureProps {
    title: string;
    subTitle: string;
    onAlertParent: Function;
    messages: Array<string>;
    addMessage: Function;
}

export interface SampleFeatureState {
    notificationMessage: string;
    notificationType: string;
    notificationTypes: Array<any>;
    notificationSides: Array<any>;
    notificationSide: string;
    notificationPositions: Array<any>;
    notificationPosition: string;
    notificationTimedOptions: Array<any>;
    notificationTimedOption: string;
    notificationDuration: number;
}

export class SampleFeature extends React.Component<
    SampleFeatureProps,
    SampleFeatureState
    > {
    constructor(props) {
        super(props);

        this.state = {
            notificationMessage: "",
            notificationType: "success",
            notificationTypes: alertUtils.getNotificationTypes(),
            notificationSides: alertUtils.getNotificationSide(),
            notificationSide: 'right',
            notificationPositions: alertUtils.getNotificationPositions(),
            notificationPosition: 'top',
            notificationTimedOptions: alertUtils.getNotificationTimedOptions(),
            notificationTimedOption: "yes",
            notificationDuration: 5000,
        };

        this.renderNotificationArea = this.renderNotificationArea.bind(this);
        this.renderTimerField = this.renderTimerField.bind(this);
        this.onAlertParent = this.onAlertParent.bind(this);
        this.onNotificationMessageChanged = this.onNotificationMessageChanged.bind(this);
        this.onNotificationDurationChanged = this.onNotificationDurationChanged.bind(this);
        this.onSelectedNotificationSideChanged = this.onSelectedNotificationSideChanged.bind(this);
        this.onSelectedNotificationPositionChanged = this.onSelectedNotificationPositionChanged.bind(this);
        this.onSelectedNotificationTypeChanged = this.onSelectedNotificationTypeChanged.bind(this);
        this.onSelectedNotificationTimedOptionChanged = this.onSelectedNotificationTimedOptionChanged.bind(this);
        this.onShowNotification = this.onShowNotification.bind(this);
    }

    onAlertParent(): void {
        const { notificationMessage } = this.state;

        if (notificationMessage) {
            this.props.onAlertParent(notificationMessage);
        }
    };

    onShowNotification(): void {
        const {
            notificationMessage,
            notificationType,
            notificationSide,
            notificationPosition,
            notificationTimedOption,
            notificationDuration
        } = this.state;

        if (notificationMessage) {
            const message: any = alertUtils.generateMessage(notificationMessage,
                notificationPosition,
                notificationSide,
                notificationType,
                (notificationTimedOption === "yes" ? notificationDuration : 0));

            this.props.addMessage(message);
        }
    };

    onNotificationMessageChanged(event: any): void {
        this.setState({
            notificationMessage: event.target.value
        });
    };

    onNotificationDurationChanged(event: any): void {
        const duration: number = Number(event.target.value);
        this.setState({
            notificationDuration: duration
        });
    };

    onSelectedNotificationTypeChanged(value: any): void {
        this.setState({
            notificationType: value
        });
    }

    onSelectedNotificationPositionChanged(event: any): void {
        this.setState({
            notificationPosition: event.value
        });
    }

    onSelectedNotificationSideChanged(event: any): void {
        this.setState({
            notificationSide: event.value
        });
    }

    onSelectedNotificationTimedOptionChanged(event: any): void {
        this.setState({
            notificationTimedOption: event.value
        });
    }

    renderNotificationArea(): React.ReactNode {
        const {
            notificationType,
            notificationTypes,
            notificationSide,
            notificationSides,
            notificationPosition,
            notificationPositions,
            notificationTimedOption,
            notificationTimedOptions
        } = this.state;

        return (
            <div className="columns notification is-multiline">
                <div className="column is-6">
                    <InputTextComponent
                        type="text"
                        placeHolder="Notification Message"
                        label="text"
                        hasLabel={true}
                        labelPosition="top"
                        isHorizontal={true}
                        iconLeft="fas fa-envelope"
                        iconRight="fas fa-check"
                        isSuccess={true}
                        isValid={true}
                        onChange={this.onNotificationMessageChanged}
                    />
                </div>
                <div className="column is-3">
                    <DropDownComponent
                        label="Type"
                        labelPosition="top"
                        selectedValue={notificationType}
                        data={notificationTypes}
                        onSelectedItemChanged={this.onSelectedNotificationTypeChanged}
                    />
                </div>
                <div className="column is-3">
                    <RadioButtonComponent
                        data={notificationSides}
                        labelPosition="top"
                        label="Side"
                        selectedValue={notificationSide}
                        onSelectedItemChanged={this.onSelectedNotificationSideChanged} />
                </div>
                <div className="column is-3">
                    <RadioButtonComponent
                        data={notificationPositions}
                        labelPosition="top"
                        label="Position"
                        selectedValue={notificationPosition}
                        onSelectedItemChanged={this.onSelectedNotificationPositionChanged} />
                </div>
                <div className="column is-3">
                    <RadioButtonComponent
                        data={notificationTimedOptions}
                        labelPosition="top"
                        label="Timed"
                        selectedValue={notificationTimedOption}
                        onSelectedItemChanged={this.onSelectedNotificationTimedOptionChanged} />
                </div>
                {this.renderTimerField()}
            </div>
        );
    };

    renderTimerField(): React.ReactNode {
        const {
            notificationTimedOption,
            notificationDuration } = this.state;

        if (notificationTimedOption === "yes") {
            return (
                <div className="column is-5">
                    <InputTextComponent
                        type="number"
                        placeHolder="Duration"
                        label="duration"
                        hasLabel={true}
                        labelPosition="left"
                        isHorizontal={true}
                        iconLeft="fas fa-clock"
                        isSuccess={true}
                        value={notificationDuration.toString()}
                        onChange={this.onNotificationDurationChanged}
                    />
                </div>
            );
        }
    }

    render() {
        const { title, subTitle } = this.props;

        return (
            <div className="sampleFeature container">
                <div className="notificationArea" />
                <div className="columns is-multiline has-text-centered">
                    <div className="column is-12">
                        <div className="sampleFeatureTitle title">{title}</div>
                    </div>
                    <div className="column is-12">
                        <div className="sampleFeatureMessage">{subTitle}</div>
                    </div>
                </div>
                {this.renderNotificationArea()}
                <div className="columns">
                    <div className="column is-6">
                        <ButtonComponent
                            isLink={true}
                            isOutlined={true}
                            onClick={this.onAlertParent}
                            text="Show on Modal"
                        />
                    </div>
                    <div className="column is-6">
                        <div className="control is-pulled-right">
                            <ButtonComponent
                                isLink={true}
                                isOutlined={true}
                                onClick={this.onShowNotification}
                                isPulledRight={true}
                                text="Show Notification"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SampleFeature);
