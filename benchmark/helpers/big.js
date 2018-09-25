/** @jsx h */
/* eslint-disable react/jsx-key */

const h = require('./h')
const { Value } = require('@gitbook/slate')

const big = (
  <document>
    {Array.from(Array(3)).map((x, i) => (
      <unstyled>
        <paragraph>Parameter Reference</paragraph>
        <quote>
          <paragraph>
            <b>Note</b> <b>This list is auto-generated from the source b</b>{' '}
            (using <b>make parameters_metadata</b>
            ) and contains the most recent parameter documentation.
          </paragraph>
        </quote>
        <paragraph>Attitude Q estimator</paragraph>
        <table>
          <table_row>
            <table_cell>
              <paragraph>Name</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Description</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'Min > Max (Incr.)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Default</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Units</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>ATT_ACC_COMP</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Acceleration compensation based on GPS velocity
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>ATT_BIAS_MAX</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Gyro bias limit</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 2'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.05</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>rad/s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>ATT_EXT_HDG_M</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                External heading usage mode (from Motion capture/Vision) Set to
                1 to use heading estimate from vision. Set to 2 to use heading
                from motion capture <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>0:</b> None
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Vision
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Motion Capture
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 2'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>ATT_MAG_DECL</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Magnetic declination, in degrees</paragraph>
              <paragraph>
                <b>Comment:</b> This parameter is not used in normal operation,
                as the declination is looked up based on the GPS coordinates of
                the vehicle.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>0.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>deg</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>ATT_MAG_DECL_A</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Automatic GPS based declination compensation
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>ATT_W_ACC</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Complimentary filter accelerometer weight</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 1'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.2</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>ATT_W_EXT_HDG</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Complimentary filter external heading weight
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 1'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>ATT_W_GYRO_BIAS</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Complimentary filter gyroscope bias weight</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 1'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>ATT_W_MAG</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Complimentary filter magnetometer weight</paragraph>
              <paragraph>
                <b>Comment:</b> Set to 0 to avoid using the magnetometer.
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 1'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
        </table>
        <paragraph>Battery Calibration</paragraph>
        <table>
          <table_row>
            <table_cell>
              <paragraph>Name</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Description</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'Min > Max (Incr.)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Default</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Units</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_ADC_CHANNEL</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Battery ADC Channel</paragraph>
              <paragraph>
                <b>Comment:</b> This parameter specifies the ADC channel used to
                monitor voltage of main power battery. A value of -1 means to
                use the board default.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_A_PER_V</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Battery current per volt (A/V)</paragraph>
              <paragraph>
                <b>Comment:</b> The voltage seen by the 3.3V ADC multiplied by
                this factor will determine the battery current. A value of -1
                means to use the board default.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1.0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_CAPACITY</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Battery capacity</paragraph>
              <paragraph>
                <b>Comment:</b> Defines the capacity of the attached battery.
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'-1.0 > 100000 (50)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>-1.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>mAh</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_CNT_V_CURR</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Scaling from ADC counts to volt on the ADC input (battery
                current)
              </paragraph>
              <paragraph>
                <b>Comment:</b> This is not the battery current, but the
                intermediate ADC voltage. A value of -1 signifies that the board
                defaults are used, which is highly recommended.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1.0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_CNT_V_VOLT</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Scaling from ADC counts to volt on the ADC input (battery
                voltage)
              </paragraph>
              <paragraph>
                <b>Comment:</b> This is not the battery voltage, but the
                intermediate ADC voltage. A value of -1 signifies that the board
                defaults are used, which is highly recommended.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1.0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_CRIT_THR</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Critical threshold</paragraph>
              <paragraph>
                <b>Comment:</b> Sets the threshold when the battery will be
                reported as critically low. This has to be lower than the low
                threshold. This threshold commonly will trigger RTL.
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.05 > 0.1 (0.01)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.07</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>norm</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_EMERGEN_THR</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Emergency threshold</paragraph>
              <paragraph>
                <b>Comment:</b> Sets the threshold when the battery will be
                reported as dangerously low. This has to be lower than the
                critical threshold. This threshold commonly will trigger
                landing.
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.03 > 0.07 (0.01)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.05</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>norm</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_LOW_THR</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Low threshold</paragraph>
              <paragraph>
                <b>Comment:</b> Sets the threshold when the battery will be
                reported as low. This has to be higher than the critical
                threshold.
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.12 > 0.4 (0.01)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.15</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>norm</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_N_CELLS</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Number of cells</paragraph>
              <paragraph>
                <b>Comment:</b> Defines the number of cells the attached battery
                consists of. <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>0:</b> Unconfigured
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> 2S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>3:</b> 3S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>4:</b> 4S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>5:</b> 5S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>6:</b> 6S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>7:</b> 7S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>8:</b> 8S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>9:</b> 9S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>10:</b> 10S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>11:</b> 11S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>12:</b> 12S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>13:</b> 13S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>14:</b> 14S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>15:</b> 15S Battery
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>16:</b> 16S Battery
                  </unstyled>
                </list_item>
              </unordered_list>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>S</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_R_INTERNAL</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Explicitly defines the per cell internal resistance
              </paragraph>
              <paragraph>
                <b>Comment:</b> If non-negative, then this will be used in place
                of BAT_V_LOAD_DROP for all calculations.
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'-1.0 > 0.2'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>-1.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Ohms</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_SOURCE</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Battery monitoring source</paragraph>
              <paragraph>
                <b>Comment:</b>
                {
                  " This parameter controls the source of battery data. The value 'Power Module' means that measurements are expected to come from a power module. If the value is set to 'External' then the system expects to receive mavlink battery status messages."
                }{' '}
                <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>0:</b> Power Module
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> External
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 1'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_V_CHARGED</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Full cell voltage (5C load)</paragraph>
              <paragraph>
                <b>Comment:</b> Defines the voltage where a single cell of the
                battery is considered full under a mild load. This will never be
                the nominal voltage of 4.2V
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>(0.01)</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>4.05</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>V</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_V_DIV</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Battery voltage divider (V divider)</paragraph>
              <paragraph>
                <b>Comment:</b> This is the divider from battery voltage to 3.3V
                ADC voltage. If using e.g. Mauch power modules the value from
                the datasheet can be applied straight here. A value of -1 means
                to use the board default.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1.0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_V_EMPTY</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Empty cell voltage (5C load)</paragraph>
              <paragraph>
                <b>Comment:</b> Defines the voltage where a single cell of the
                battery is considered empty. The voltage should be chosen before
                the steep dropoff to 2.8V. A typical lithium battery can only be
                discharged down to 10% before it drops off to a voltage level
                damaging the cells.
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>(0.01)</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>3.5</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>V</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_V_LOAD_DROP</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Voltage drop per cell on full throttle</paragraph>
              <paragraph>
                <b>Comment:</b> This implicitely defines the internal resistance
                to maximum current ratio and assumes linearity. A good value to
                use is the difference between the 5C and 20-25C load. Not used
                if BAT_R_INTERNAL is set.
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.07 > 0.5 (0.01)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.3</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>V</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>BAT_V_OFFS_CURR</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Offset in volt as seen by the ADC input of the current sensor
              </paragraph>
              <paragraph>
                <b>Comment:</b> This offset will be subtracted before
                calculating the battery current based on the voltage.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>0.0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
        </table>
        <paragraph>Camera Control</paragraph>
        <table>
          <table_row>
            <table_cell>
              <paragraph>Name</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Description</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'Min > Max (Incr.)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Default</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Units</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CAM_FBACK_MODE</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Camera feedback mode</paragraph>
              <paragraph>
                <b>Comment:</b> Sets the camera feedback mode. <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>0:</b> Disabled
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Feedback on trigger
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 1'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
        </table>
        <paragraph>Camera trigger</paragraph>
        <table>
          <table_row>
            <table_cell>
              <paragraph>Name</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Description</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'Min > Max (Incr.)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Default</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Units</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>TRIG_ACT_TIME</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Camera trigger activation time</paragraph>
              <paragraph>
                <b>Comment:</b> This parameter sets the time the trigger needs
                to pulled high or low.
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.1 > 3000'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>40.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>ms</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>TRIG_DISTANCE</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Camera trigger distance</paragraph>
              <paragraph>
                <b>Comment:</b> Sets the distance at which to trigger the
                camera.
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > ? (1)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>25.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>TRIG_INTERFACE</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Camera trigger Interface</paragraph>
              <paragraph>
                <b>Comment:</b> Selects the trigger interface <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>1:</b> GPIO
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Seagull MAP2 (over PWM)
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>3:</b> MAVLink (forward via MAV_CMD_IMAGE_START_CAPTURE)
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>4:</b> Generic PWM (IR trigger, servo)
                  </unstyled>
                </list_item>
              </unordered_list>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>4</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>TRIG_INTERVAL</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Camera trigger interval</paragraph>
              <paragraph>
                <b>Comment:</b> This parameter sets the time between two
                consecutive trigger events
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'4.0 > 10000.0'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>40.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>ms</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>TRIG_MODE</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Camera trigger mode <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>0:</b> Disable
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Time based, on command
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Time based, always on
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>3:</b> Distance based, always on
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>4:</b> Distance based, on command (Survey mode)
                  </unstyled>
                </list_item>
              </unordered_list>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 4'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>TRIG_PINS</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Camera trigger pin</paragraph>
              <paragraph>
                <b>Comment:</b> Selects which pin is used, ranges from 1 to 6
                (AUX1-AUX6 on px4fmu-v2 and the rail pins on px4fmu-v4). The PWM
                interface takes two pins per camera, while relay triggers on
                every pin individually. Example: Value 56 would trigger on pins
                5 and 6. For GPIO mode Pin 6 will be triggered followed by 5.
                With a value of 65 pin 5 will be triggered followed by 6. Pins
                may be non contiguous. I.E. 16 or 61. In GPIO mode the delay pin
                to pin is
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'1 > 123456'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>56</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>TRIG_POLARITY</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Camera trigger polarity</paragraph>
              <paragraph>
                <b>Comment:</b> This parameter sets the polarity of the trigger
                (0 = active low, 1 = active high ) <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>0:</b> Active low
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Active high
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 1'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
        </table>
        <paragraph>Circuit Breaker</paragraph>
        <table>
          <table_row>
            <table_cell>
              <paragraph>Name</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Description</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'Min > Max (Incr.)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Default</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Units</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CBRK_AIRSPD_CHK</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Circuit breaker for airspeed sensor</paragraph>
              <paragraph>
                <b>Comment:</b> Setting this parameter to 162128 will disable
                the check for an airspeed sensor. WARNING: ENABLING THIS CIRCUIT
                BREAKER IS AT OWN RISK
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 162128'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CBRK_BUZZER</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Circuit breaker for disabling buzzer</paragraph>
              <paragraph>
                <b>Comment:</b> Setting this parameter to 782097 will disable
                the buzzer audio notification. WARNING: ENABLING THIS CIRCUIT
                BREAKER IS AT OWN RISK
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 782097'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CBRK_ENGINEFAIL</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Circuit breaker for engine failure detection
              </paragraph>
              <paragraph>
                <b>Comment:</b> Setting this parameter to 284953 will disable
                the engine failure detection. If the aircraft is in engine
                failure mode the engine failure flag will be set to healthy
                WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 284953'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>284953</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CBRK_FLIGHTTERM</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Circuit breaker for flight termination</paragraph>
              <paragraph>
                <b>Comment:</b>
                {
                  ' Setting this parameter to 121212 will disable the flight termination action. --> The IO driver will not do flight termination if requested by the FMU WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK'
                }
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 121212'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>121212</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CBRK_GPSFAIL</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Circuit breaker for GPS failure detection</paragraph>
              <paragraph>
                <b>Comment:</b> Setting this parameter to 240024 will disable
                the GPS failure detection. If this check is enabled, then the
                sensor check will fail if the GPS module is missing. It will
                also check for excessive signal noise on the GPS receiver and
                warn the user if detected. WARNING: ENABLING THIS CIRCUIT
                BREAKER IS AT OWN RISK
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 240024'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CBRK_IO_SAFETY</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Circuit breaker for IO safety</paragraph>
              <paragraph>
                <b>Comment:</b> Setting this parameter to 22027 will disable IO
                safety. WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 22027'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CBRK_RATE_CTRL</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Circuit breaker for rate controller output</paragraph>
              <paragraph>
                <b>Comment:</b> Setting this parameter to 140253 will disable
                the rate controller uORB publication. WARNING: ENABLING THIS
                CIRCUIT BREAKER IS AT OWN RISK
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 140253'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CBRK_SUPPLY_CHK</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Circuit breaker for power supply check</paragraph>
              <paragraph>
                <b>Comment:</b> Setting this parameter to 894281 will disable
                the power valid checks in the commander. WARNING: ENABLING THIS
                CIRCUIT BREAKER IS AT OWN RISK
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 894281'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CBRK_USB_CHK</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Circuit breaker for USB link check</paragraph>
              <paragraph>
                <b>Comment:</b> Setting this parameter to 197848 will disable
                the USB connected checks in the commander. WARNING: ENABLING
                THIS CIRCUIT BREAKER IS AT OWN RISK
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 197848'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>CBRK_VELPOSERR</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Circuit breaker for position error check</paragraph>
              <paragraph>
                <b>Comment:</b> Setting this parameter to 201607 will disable
                the position and velocity accuracy checks in the commander.
                WARNING: ENABLING THIS CIRCUIT BREAKER IS AT OWN RISK
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 201607'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
        </table>
        <paragraph>Commander</paragraph>
        <table>
          <table_row>
            <table_cell>
              <paragraph>Name</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Description</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'Min > Max (Incr.)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Default</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Units</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_AUTH</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Arm authorization parameters, this uint32_t will be split
                between starting from the LSB: - 8bits to authorizer system id -
                16bits to authentication method parameter, this will be used to
                store a timeout for the first 2 methods but can be used to
                another parameter for other new authentication methods. - 7bits
                to authentication method - one arm = 0 - two step arm = 1 * the
                MSB bit is not used to avoid problems in the conversion between
                int and uint
              </paragraph>
              <paragraph>
                <b>Comment:</b> Default value: (10
                {'<'}
                {'< 0 | 1000 '}
                {'<'}
                {'< 8 | 0 '}
                {'<'}
                {
                  '< 24)=256010 - authorizer system id=10 - authentication method parameter=10000msec of timeout - authentication method=during arm'
                }
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>256010</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_EKF_AB</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Maximum value of EKF accelerometer delta velocity bias estimate
                that will allow arming. Note: ekf2 will limit the delta velocity
                bias estimate magnitude to be less than EKF2_ABL_LIM *
                FILTER_UPDATE_PERIOD_MS * 0.001 so this parameter must be less
                than that to be useful
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.001 > 0.01 (0.0001)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>2.4e-3</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m/s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_EKF_GB</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Maximum value of EKF gyro delta angle bias estimate that will
                allow arming
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.0001 > 0.0017 (0.0001)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>8.7e-4</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>rad</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_EKF_HGT</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Maximum EKF height innovation test ratio that will allow arming
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.1 > 1.0 (0.05)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>1.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_EKF_POS</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Maximum EKF position innovation test ratio that will allow
                arming
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.1 > 1.0 (0.05)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.5</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_EKF_VEL</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Maximum EKF velocity innovation test ratio that will allow
                arming
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.1 > 1.0 (0.05)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.5</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m/s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_EKF_YAW</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Maximum EKF yaw innovation test ratio that will allow arming
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.1 > 1.0 (0.05)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.5</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>rad</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_IMU_ACC</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Maximum accelerometer inconsistency between IMU units that will
                allow arming
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.1 > 1.0 (0.05)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.7</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m/s/s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_IMU_GYR</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Maximum rate gyro inconsistency between IMU units that will
                allow arming
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.02 > 0.3 (0.01)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.25</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>rad/s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_MAG</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Maximum magnetic field inconsistency between units that will
                allow arming
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.05 > 0.5 (0.05)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.15</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Gauss</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_MIS_REQ</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Require valid mission to arm</paragraph>
              <paragraph>
                <b>Comment:</b> The default allows to arm the vehicle without a
                valid mission.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_SWISBTN</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Arm switch is only a button</paragraph>
              <paragraph>
                <b>Comment:</b> The default uses the arm switch as real switch.
                If parameter set button gets handled like stick arming.{' '}
                <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>0:</b> Arm switch is a switch that stays on when armed
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Arm switch is a button that only triggers arming
                    and disarming
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 1'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_ARM_WO_GPS</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Allow arming without GPS</paragraph>
              <paragraph>
                <b>Comment:</b> The default allows to arm the vehicle without
                GPS signal.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_DISARM_LAND</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Time-out for auto disarm after landing</paragraph>
              <paragraph>
                <b>Comment:</b> A non-zero, positive value specifies the
                time-out period in seconds after which the vehicle will be
                automatically disarmed in case a landing situation has been
                detected during this period. The vehicle will also auto-disarm
                right after arming if it has not even flown, however the time
                will always be 10 seconds such that the pilot has enough time to
                take off. A negative value means that automatic disarming
                triggered by landing detection is disabled.
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'-1 > 20'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>-1.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_DL_LOSS_T</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Datalink loss time threshold</paragraph>
              <paragraph>
                <b>Comment:</b> After this amount of seconds without datalink
                the data link lost mode triggers
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'5 > 300 (0.5)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>10</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_DL_REG_T</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Datalink regain time threshold</paragraph>
              <paragraph>
                <b>Comment:</b>
                {
                  " After a data link loss: after this this amount of seconds with a healthy datalink the 'datalink loss' flag is set back to false"
                }
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 3 (0.5)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_EF_C2T</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Engine Failure Current/Throttle Threshold</paragraph>
              <paragraph>
                <b>Comment:</b> Engine failure triggers only below this current
                value
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.0 > 50.0 (1)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>5.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>A/%</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_EF_THROT</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Engine Failure Throttle Threshold</paragraph>
              <paragraph>
                <b>Comment:</b> Engine failure triggers only above this throttle
                value
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.0 > 1.0 (0.01)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.5</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>norm</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_EF_TIME</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Engine Failure Time Threshold</paragraph>
              <paragraph>
                <b>Comment:</b> Engine failure triggers only if the throttle
                threshold and the current to throttle threshold are violated for
                this time
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0.0 > 60.0 (1)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>10.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_FLIGHT_UUID</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Next flight UUID</paragraph>
              <paragraph>
                <b>Comment:</b> This number is incremented automatically after
                every flight on disarming in order to remember the next flight
                UUID. The first flight is 0.
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > ?'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_FLTMODE1</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>First flightmode slot (1000-1160)</paragraph>
              <paragraph>
                <b>Comment:</b> If the main switch channel is in this range the
                selected flight mode will be applied. <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>-1:</b> Unassigned
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>0:</b> Manual
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Altitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Position
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>3:</b> Mission
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>4:</b> Hold
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>5:</b> Return
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>6:</b> Acro
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>7:</b> Offboard
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>8:</b> Stabilized
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>9:</b> Rattitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>10:</b> Takeoff
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>11:</b> Land
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>12:</b> Follow Me
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_FLTMODE2</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Second flightmode slot (1160-1320)</paragraph>
              <paragraph>
                <b>Comment:</b> If the main switch channel is in this range the
                selected flight mode will be applied. <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>-1:</b> Unassigned
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>0:</b> Manual
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Altitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Position
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>3:</b> Mission
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>4:</b> Hold
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>5:</b> Return
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>6:</b> Acro
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>7:</b> Offboard
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>8:</b> Stabilized
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>9:</b> Rattitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>10:</b> Takeoff
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>11:</b> Land
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>12:</b> Follow Me
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_FLTMODE3</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Third flightmode slot (1320-1480)</paragraph>
              <paragraph>
                <b>Comment:</b> If the main switch channel is in this range the
                selected flight mode will be applied. <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>-1:</b> Unassigned
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>0:</b> Manual
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Altitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Position
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>3:</b> Mission
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>4:</b> Hold
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>5:</b> Return
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>6:</b> Acro
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>7:</b> Offboard
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>8:</b> Stabilized
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>9:</b> Rattitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>10:</b> Takeoff
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>11:</b> Land
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>12:</b> Follow Me
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_FLTMODE4</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Fourth flightmode slot (1480-1640)</paragraph>
              <paragraph>
                <b>Comment:</b> If the main switch channel is in this range the
                selected flight mode will be applied. <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>-1:</b> Unassigned
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>0:</b> Manual
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Altitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Position
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>3:</b> Mission
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>4:</b> Hold
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>5:</b> Return
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>6:</b> Acro
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>7:</b> Offboard
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>8:</b> Stabilized
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>9:</b> Rattitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>10:</b> Takeoff
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>11:</b> Land
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>12:</b> Follow Me
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_FLTMODE5</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Fifth flightmode slot (1640-1800)</paragraph>
              <paragraph>
                <b>Comment:</b> If the main switch channel is in this range the
                selected flight mode will be applied. <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>-1:</b> Unassigned
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>0:</b> Manual
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Altitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Position
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>3:</b> Mission
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>4:</b> Hold
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>5:</b> Return
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>6:</b> Acro
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>7:</b> Offboard
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>8:</b> Stabilized
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>9:</b> Rattitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>10:</b> Takeoff
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>11:</b> Land
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>12:</b> Follow Me
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_FLTMODE6</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Sixth flightmode slot (1800-2000)</paragraph>
              <paragraph>
                <b>Comment:</b> If the main switch channel is in this range the
                selected flight mode will be applied. <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>-1:</b> Unassigned
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>0:</b> Manual
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Altitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Position
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>3:</b> Mission
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>4:</b> Hold
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>5:</b> Return
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>6:</b> Acro
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>7:</b> Offboard
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>8:</b> Stabilized
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>9:</b> Rattitude
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>10:</b> Takeoff
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>11:</b> Land
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>12:</b> Follow Me
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>-1</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_HLDL_LOSS_T</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>High Latency Datalink loss time threshold</paragraph>
              <paragraph>
                <b>Comment:</b> After this amount of seconds without datalink
                the data link lost mode triggers
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'60 > 3600'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>120</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_HLDL_REG_T</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>High Latency Datalink regain time threshold</paragraph>
              <paragraph>
                <b>Comment:</b>
                {
                  " After a data link loss: after this this amount of seconds with a healthy datalink the 'datalink loss' flag is set back to false"
                }
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 60'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_HOME_H_T</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Home set horizontal threshold</paragraph>
              <paragraph>
                <b>Comment:</b> The home position will be set if the estimated
                positioning accuracy is below the threshold.
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'2 > 15 (0.5)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>5.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_HOME_V_T</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Home set vertical threshold</paragraph>
              <paragraph>
                <b>Comment:</b> The home position will be set if the estimated
                positioning accuracy is below the threshold.
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'5 > 25 (0.5)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>10.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_LOW_BAT_ACT</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Battery failsafe mode</paragraph>
              <paragraph>
                <b>Comment:</b> Action the system takes on low battery. Defaults
                to off <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>0:</b> Warning
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Return mode
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Land mode
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>3:</b> Return mode at critically low level, Land mode at
                    current position if reaching dangerously low levels
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell>
              <paragraph>(1)</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_OF_LOSS_T</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>
                Time-out to wait when offboard connection is lost before
                triggering offboard lost action. See COM_OBL_ACT and
                COM_OBL_RC_ACT to configure action
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 60 (1)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_POS_FS_DELAY</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Loss of position failsafe activation delay</paragraph>
              <paragraph>
                <b>Comment:</b> This sets number of seconds that the position
                checks need to be failed before the failsafe will activate. The
                default value has been optimised for rotary wing applications.
                For fixed wing applications, a larger value between 5 and 10
                should be used.
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'1 > 100'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>1</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>sec</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_POS_FS_EPH</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Horizontal position error threshold</paragraph>
              <paragraph>
                <b>Comment:</b> This is the horizontal position error (EPV)
                threshold that will trigger a failsafe. The default is
                appropriate for a multicopter. Can be increased for a
                fixed-wing.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>5</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_POS_FS_EPV</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Vertical position error threshold</paragraph>
              <paragraph>
                <b>Comment:</b> This is the vertical position error (EPV)
                threshold that will trigger a failsafe. The default is
                appropriate for a multicopter. Can be increased for a
                fixed-wing.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>10</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_POS_FS_GAIN</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Loss of position probation gain factor</paragraph>
              <paragraph>
                <b>Comment:</b> This sets the rate that the loss of position
                probation time grows when position checks are failing. The
                default value has been optimised for rotary wing applications.
                For fixed wing applications a value of 0 should be used.
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>10</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_POS_FS_PROB</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Loss of position probation delay at takeoff</paragraph>
              <paragraph>
                <b>Comment:</b> The probation delay is the number of seconds
                that the EKF innovation checks need to pass for the position to
                be declared good after it has been declared bad. The probation
                delay will be reset to this parameter value when takeoff is
                detected. After takeoff, if position checks are passing, the
                probation delay will reduce by one second for every lapsed
                second of valid position down to a minimum of 1 second. If
                position checks are failing, the probation delay will increase
                by COM_POS_FS_GAIN seconds for every lapsed second up to a
                maximum of 100 seconds. The default value has been optimised for
                rotary wing applications. For fixed wing applications, a value
                of 1 should be used.
              </paragraph>
              <paragraph>
                <b>Reboot required:</b> true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'1 > 100'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>30</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>sec</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_RC_ARM_HYST</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>RC input arm/disarm command duration</paragraph>
              <paragraph>
                <b>Comment:</b> The default value of 1000 requires the stick to
                be held in the arm or disarm position for 1 second.
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'100 > 1500'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>1000</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_RC_IN_MODE</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>RC control input mode</paragraph>
              <paragraph>
                <b>Comment:</b> The default value of 0 requires a valid RC
                transmitter setup. Setting this to 1 allows joystick control and
                disables RC input handling and the associated checks. A value of
                2 will generate RC control data from manual input received via
                MAVLink instead of directly forwarding the manual input data.{' '}
                <b>Values:</b>
              </paragraph>
              <unordered_list>
                <list_item>
                  <unstyled>
                    <b>0:</b> RC Transmitter
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>1:</b> Joystick/No RC Checks
                  </unstyled>
                </list_item>
                <list_item>
                  <unstyled>
                    <b>2:</b> Virtual RC by Joystick
                  </unstyled>
                </list_item>
              </unordered_list>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 2'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_RC_LOSS_T</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>RC loss time threshold</paragraph>
              <paragraph>
                <b>Comment:</b> After this amount of seconds without RC
                connection the rc lost flag is set to true
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'0 > 35 (0.1)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>0.5</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>s</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_RC_OVERRIDE</b> (INT32)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Enable RC stick override of auto modes</paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>0</paragraph>
            </table_cell>
            <table_cell />
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_RC_STICK_OV</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>RC stick override threshold</paragraph>
              <paragraph>
                <b>Comment:</b> If an RC stick is moved more than by this amount
                the system will interpret this as override request by the pilot.
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>{'5 > 40 (0.05)'}</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>12.0</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>%</paragraph>
            </table_cell>
          </table_row>
          <table_row>
            <table_cell>
              <paragraph>
                <b>COM_VEL_FS_EVH</b> (FLOAT)
              </paragraph>
            </table_cell>
            <table_cell>
              <paragraph>Horizontal velocity error threshold</paragraph>
              <paragraph>
                <b>Comment:</b> This is the horizontal velocity error (EVH)
                threshold that will trigger a failsafe. The default is
                appropriate for a multicopter. Can be increased for a
                fixed-wing.
              </paragraph>
            </table_cell>
            <table_cell />
            <table_cell>
              <paragraph>1</paragraph>
            </table_cell>
            <table_cell>
              <paragraph>m/s</paragraph>
            </table_cell>
          </table_row>
        </table>
      </unstyled>
    ))}
  </document>
)

const bigValue = Value.create(
  {
    document: big,
  },
  { normalize: false }
)

module.exports = bigValue
