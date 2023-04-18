import PropTypes from 'prop-types';
import ThemeColorPresets from './ThemeColorPresets';
import ThemeContrast from './ThemeContrast';
import ThemeRtlLayout from './ThemeRtlLayout';

// ----------------------------------------------------------------------

ThemeSettings.propTypes = {
    children: PropTypes.node,
};

export default function ThemeSettings({ children }) {
    return (
        <ThemeColorPresets>
            <ThemeContrast>
                <ThemeRtlLayout>
                    {children}
                    {/* <SettingsDrawer /> */}
                </ThemeRtlLayout>
            </ThemeContrast>
        </ThemeColorPresets>
    );
}
